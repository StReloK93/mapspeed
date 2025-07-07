<template>
	<section class="h-full flex fixed inset-0">
		<PreLoader :loading="pageData.loading" />
		<RouterLink to="/"
			class="fixed left-3 top-3 btn-line bg-white shadow-md !text-xl z-50 text-center content-center">
			<i class="fa-duotone fa-house"></i>
		</RouterLink>
		<div ref="geozonemap" class="h-full flex-grow relative z-40">
			<h3 class="absolute top-3 right-20 text-xl text-teal-600 z-[1000] font-semibold">
				{{ pageData.selectedOrderWay?.name }}
			</h3>
			<div @click.stop @mousedown.stop :class="[pageData.selectedOrderWay != null ? 'right-0' : '-right-12']"
				class="z-[1000] cursor-auto absolute bottom-0 top-0 transition-all bg-gray-50 p-2 shadow-inner border-r border-teal-400 flex flex-col gap-2">
				<button @click="selectedClear()"
					class="w-8 h-8 text-sm bg-red-300/20 shadow text-red-900 rounded active:bg-red-500/50 hover:bg-red-500/30">
					<i class="fa-solid fa-xmark"></i>
				</button>

				<button @click="clearData"
					class="w-8 h-8 text-sm bg-teal-300/20 shadow text-teal-900 rounded active:bg-teal-500/50 hover:bg-teal-500/30">
					<i class="fa-solid fa-broom-wide"></i>
				</button>
			</div>
			<div @click.stop @mousedown.stop :class="[pageData.selectedOrderWay != null ? 'bottom-0' : '-bottom-10']"
				class="z-[1000] justify-end cursor-auto absolute right-12 transition-all p-2 gap-2 flex">
				<button @click="pageData.leaflet.changeColorDrawLine('green')" v-if="pageData.selectedCircle"
					class="w-8 h-8 rounded-full border border-green-600 bg-teal-400/60 active:bg-teal-500/50 hover:bg-teal-500/30">
				</button>
				<button @click="pageData.leaflet.changeColorDrawLine('red')" v-if="pageData.selectedCircle"
					class="w-8 h-8 rounded-full border border-rose-600 bg-red-400/80 active:bg-red-500/50 hover:bg-red-500/30">
				</button>
				<button @click="pageData.leaflet.deleteDrawLine" v-if="pageData.selectedCircle"
					class="w-8 h-8 rounded uppercase bg-red-400/40 text-red-900 font-bold active:bg-red-500/50 hover:bg-red-500/30 mx-5">
					<i class="fa-duotone fa-solid fa-trash"></i>
				</button>
				<button @click="sendPoints"
					v-if="!pageData.selectedCircle"
					class="w-24 py-1.5 rounded uppercase bg-teal-400/40 text-teal-900 font-bold active:bg-teal-500/50 hover:bg-teal-500/30">
					<i v-if="pageData.loading " class="fa-solid fa-spinner fa-spin-pulse"></i>
					<span v-else>Saqlash <i class="fa-solid fa-floppy-disk ml-1.5"></i></span>
				</button>
			</div>

			<Transition>
				<div v-if="pageData.selectedOrderWay == null" @click.stop @mousedown.stop
					class="absolute inset-0 z-[2000]  bg-teal-600/90 flex justify-center items-center">
					<main class="text-center text-white">
						<h3 class="text-3xl mb-3 uppercase">Hisobotni tanlang</h3>
						<span class="text-6xl ">
							<i class="fa-solid fa-map"></i>
						</span>
					</main>
				</div>
			</Transition>
		</div>
		<div class="p-2 z-50 h-full flex w-[420px] flex-col bg-white">
			<button :disabled="pageData.editable != null" @click="newOrderWay()"
				class="bg-teal-500/20 text-teal-900 rounded py-1 font-semibold active:bg-teal-500/50 hover:bg-teal-500/30 disabled:bg-gray-200">
				Yangi hisobot
			</button>
			<ul class="mt-1.5">
				<li v-for="order in pageData.orders" class="">
					<form @submit="upsertOrderWay($event, order)" :class="{ 'mb-1.5': order.id === undefined }" class="flex gap-1.5">
						<OrderNameInput :pageData="pageData" :order="order" />
						<NewOrderEvents v-if="order.id === undefined" @delete="deleteOrderWay(order)" />
						<ExistOrderEvents v-else :pageData="pageData" :order="order" @delete-order-way="deleteOrderWay(order)"
							@edit-exists-order="editExistsOrder(order)" @selected-way-change="selectedWayChange(order)" />
					</form>
					<main v-if="order.id" class="px-2 mb-1.5">
						<span class="text-sm text-gray-400">
							{{ moment(order.created_at).format('DD-MM-YYYY') }}
						</span>
					</main>
				</li>
			</ul>
		</div>
	</section>
</template>

<script setup lang="ts">
import OrderNameInput from './WaysRedactorComponents/OrderNameInput.vue'
import NewOrderEvents from './WaysRedactorComponents/NewOrderEvents.vue'
import ExistOrderEvents from './WaysRedactorComponents/ExistOrderEvents.vue'
import moment from 'moment'
import Wialon from '@/modules/Wialon'
import Leaflet from '@/modules/Leaflet'
import { onMounted, ref, reactive } from 'vue'
import PreLoader from '@/components/PreLoader.vue'
import OrderWaysRepository from '@/entities/OrderWaysRepository'

const geozonemap = ref(null)

const pageData = reactive({
	wialon: null,
	leaflet: null,
	loading: false,
	selectedOrderWay: null,
	selectedLoading: null,
	orders: [],
	editable: null,
	selectedCircle: null,
})

function newOrderWay() {
	pageData.orders.unshift({ name: '', edit: null })
	pageData.editable = pageData.orders[0]
}

async function deleteOrderWay(order) {
	await OrderWaysRepository.destroy(order.id)
	const index = pageData.orders.findIndex((orda) => orda == order)
	pageData.orders.splice(index, 1)

	if (pageData.editable == order) pageData.editable = null
}

function editExistsOrder(selected) {
	pageData.orders = pageData.orders.filter((order) => order.id !== undefined)
	pageData.editable = selected
}

async function upsertOrderWay(event, order) {
	event.preventDefault()
	if (order.id === undefined) {
		const { data } = await OrderWaysRepository.store(order)
		pageData.editable = null
		const index = pageData.orders.findIndex((orderas) => orderas == order)
		pageData.orders[index] = data
	}
	else {
		OrderWaysRepository.updateName(order)
		pageData.editable = null
	}
}

function clearData() {
	pageData.leaflet?.clearDrawLinePoints()
}

async function sendPoints() {
	if (pageData.selectedOrderWay == null) return console.log('tanlang');

	pageData.loading = true
	const points = pageData.leaflet.geetDrawPoints()
	OrderWaysRepository.update(pageData.selectedOrderWay.id, points)
	setTimeout(() => pageData.loading = false, 2000)
}

async function selectedWayChange(order) {
	clearData()
	pageData.selectedLoading = order
	const { data } = await OrderWaysRepository.show(order.id)
	pageData.selectedOrderWay = null
	setTimeout(() => {
		pageData.selectedOrderWay = order
		pageData.leaflet?.reDrawLinesBase(data.points)
	}, 500)
}

function selectedClear() {
	pageData.selectedLoading = null
	pageData.selectedOrderWay = null
	clearData()
}


onMounted(async () => {
	const { data } = await OrderWaysRepository.index()
	pageData.orders = data
	pageData.leaflet = new Leaflet(geozonemap.value, 2)
	pageData.wialon = new Wialon(pageData.leaflet.map)
	pageData.leaflet.onClearSelectCircle = function () {
		pageData.selectedCircle = false
	}

	pageData.leaflet.onSelectCircle = function () {
		pageData.selectedCircle = true
	}
})
</script>
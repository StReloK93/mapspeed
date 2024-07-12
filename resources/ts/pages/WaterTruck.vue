<template>
	<section class="fixed inset-0">
		<PreLoader :loading="pageData.loading" />
		<RouterLink to="/" class="absolute right-3 top-3 btn-line bg-white shadow-md !text-xl z-50 text-center content-center">
			<i class="fa-sharp fa-light fa-xmark"></i>
		</RouterLink>
		<div class="absolute bottom-3 left-0 p-2 z-50">
			<input type="date" v-model="pageData.currentDate" @change="createLines" class="px-4 py-1.5 rounded-full shadow-sm">
			<button :class="{'!bg-teal-600 !text-white': pageData.smena == 1}" @click="onChangeSmena(1)" class="bg-white px-4 ml-2 py-1.5 rounded-full">1 Smena</button>
			<button :class="{'!bg-teal-600 !text-white': pageData.smena == 2}" @click="onChangeSmena(2)" class="bg-white px-4 ml-2 py-1.5 rounded-full">2 Smena</button>
		</div>

		<div ref="geozonemap" class="h-full w-full z-40"></div>
	</section>
</template>

<script setup lang="ts">
import moment from 'moment'
import Wialon from '@/modules/Wialon'
import Leaflet from '@/modules/Leaflet'
import { getTimesBySmena, detectSmenaDay } from '@/modules/TimezoneDate'
import { onMounted, ref, reactive, onUnmounted } from 'vue'
import PreLoader from '@/components/PreLoader.vue'
const geozonemap = ref()
const smena = detectSmenaDay(moment())
const pageData = reactive({
	currentDate: smena.date,
	wialon: null,
	geozones: null,
	leaflet: null,
	selected: null,
	loading: false,
	smena: smena.smena
})

function onChangeSmena(smena) {
	pageData.smena = smena
	createLines()
}




// const interval = setInterval(() => {
//    createLines()
// },10000)

async function createLines() {
	pageData.loading = true

	const smena = getTimesBySmena(pageData.currentDate, pageData.smena)
	const from = smena.start
	const to = smena.end

	await pageData.wialon.waterTruckReport(from, to)
	pageData.loading = false

}

onMounted(async () => {
	pageData.leaflet = new Leaflet(geozonemap.value)
	pageData.wialon = new Wialon(pageData.leaflet.map)
	pageData.wialon.onInit = () => createLines()

})

onUnmounted(() => {
   // clearInterval(interval)
})
</script>
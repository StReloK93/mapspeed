<template>
	<section class="fixed inset-0">
		<PreLoader :loading="pageData.loading" />
		<GrayderModal v-if="modalToggle" @close="modalToggle = false"/>
		<GrayderModalSmena v-if="modalToggleSmena" @close="modalToggleSmena = false"/>
		<RouterLink to="/" class="absolute left-3 top-3 btn-line bg-white shadow-md !text-xl z-50 text-center content-center">
			<i class="fa-duotone fa-house"></i>
		</RouterLink>
		<div class="absolute bottom-3 left-0 p-2 z-50">
			<input type="date" v-model="pageData.currentDate" @change="createLines" class="px-4 py-1.5 rounded-full shadow-sm">
			<button :class="{'!bg-teal-600 !text-white': pageData.smena == 1}" @click="onChangeSmena(1)" class="bg-white px-4 ml-2 py-1.5 rounded-full">1 Smena</button>
			<button :class="{'!bg-teal-600 !text-white': pageData.smena == 2}" @click="onChangeSmena(2)" class="bg-white px-4 ml-2 py-1.5 rounded-full">2 Smena</button>
			<button @click="modalToggle = true" class="bg-white px-4 ml-2 py-1.5 rounded-full">Контроль зачистки забоя в пересменку</button>
			<button @click="modalToggleSmena = true" class="bg-white px-4 ml-2 py-1.5 rounded-full">Контроль зачистки забоя во время смены</button>
		</div>

		<div ref="geozonemap" class="h-full w-full z-40"></div>
	</section>
</template>

<script setup lang="ts">
import moment from 'moment'
import GrayderModal from '@/components/GrayderModal.vue'
import GrayderModalSmena from '@/components/GrayderModalSmena.vue'
import Wialon from '@/modules/Wialon'
import Leaflet from '@/modules/Leaflet'
import { getTimesBySmena, detectSmenaDay } from '@/modules/TimezoneDate'
import { onMounted, ref, reactive } from 'vue'
import PreLoader from '@/components/PreLoader.vue'
const geozonemap = ref()
const modalToggle = ref(false)
const modalToggleSmena = ref(false)
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

async function createLines() {
	pageData.loading = true

	const smena = getTimesBySmena(pageData.currentDate, pageData.smena)
	const from = smena.start
	const to = smena.end

	await pageData.wialon.greyderReport(from, to)
	pageData.loading = false

}

onMounted(async () => {
	pageData.leaflet = new Leaflet(geozonemap.value)
	pageData.wialon = new Wialon(pageData.leaflet.map)
	pageData.wialon.onInit = () => createLines()

})
</script>
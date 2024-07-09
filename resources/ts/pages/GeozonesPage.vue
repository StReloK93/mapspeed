<template>
	<section class="fixed inset-0">
		<PreLoader :loading="pageData.loading" />
		<RouterLink to="/" class="absolute right-3 top-3 btn-line bg-white shadow-md !text-xl z-50 text-center content-center">
			<i class="fa-sharp fa-light fa-xmark"></i>
		</RouterLink>
		<div class="absolute bottom-[105px] left-0 p-2 z-50">
			<input type="date" v-model="pageData.currentDate" @change="selectDay()" class="px-4 py-1.5 rounded-full">
		</div>
		<aside class="absolute left-0 bottom-0  z-50 w-full p-2 ">
			<main class="flex flex-wrap gap-1 justify-between px-6 items-center h-24 bg-white relative rounded-md shadow-md">
				<span class="border-b w-full absolute top-1/2 left-0 border-gray-400"></span>
				<span class="inline-flex w-4 h-4 justify-center items-center relative z-20"
					v-for="(gazon, index) in pageData.geozones">
					<button @click="writeGeozonesToMap(index)" :class="{
						'!bottom-4': index % 2 == 1,
						'top-4': index % 2 == 0,
						'text-xs w-7 h-7 bg-gray-200': gazon.zero == false,
						'w-9 h-9 bg-gray-300': gazon.zero,
						'!bg-blue-600 text-white': pageData.selected == index
					}" class="absolute rounded-full hover:bg-gray-100 active:bg-gray-50 shadow-sm">
						<span v-if="gazon.zero" class="text-[11px] font-bold relative -top-px">
							{{ moment(gazon.dateTime).format('HH:mm') }}
						</span>
						<span v-else>
							{{ moment(gazon.dateTime).format('mm') }}
						</span>
					</button>
					<i v-if="gazon.zero" class="fa-solid fa-circle-small text-sm"></i>
					<i v-else class="fa-light fa-pipe text-[10px]"></i>
				</span>
			</main>
		</aside>
		<div ref="geozonemap" class="h-full w-full z-40"></div>
	</section>
</template>

<script setup lang="ts">
import moment from 'moment'
import Wialon from '@/modules/Wialon'
import Leaflet from '@/modules/Leaflet'
import { onMounted, ref, reactive , toRaw } from 'vue'
import PreLoader from '@/components/PreLoader.vue'
const geozonemap = ref()

const pageData = reactive({
	currentDate: moment().format('YYYY-MM-DD'),
	wialon: null,
	geozones: null,
	leaflet: null,
	selected: null,
	loading: false,
})



async function getGeozones(date) {
	const { data: geozonesObj } = await axios.get(`api/get_geozones/${date}`)
	const geozones = []
	for (const key in geozonesObj) {
		geozones.push({
			dateTime: moment(key).format('YYYY-MM-DD HH:mm'),
			points: geozonesObj[key],
			zero: moment(key).format('mm') == '00'
		})
	}
	return geozones
}

const geozonesList = []

function clearGeozonesInMap() {
	geozonesList.forEach((gezo) => {
		pageData.leaflet.map.removeLayer(gezo)
	})
}

function writeGeozonesToMap(index) {
	const geozone = pageData.geozones[index]
	createLines(geozone.dateTime)
	
	clearGeozonesInMap()
	if (pageData.geozones.length == 0) return
	pageData.selected = index
	geozone.points.forEach((geozone) => {
		const popupContent = geozone.name;
		const style = { color: '#333', weight: 3, fillColor: "red", fillOpacity: 0.5 }

		if (geozone.points.length > 1) {
			const points = geozone.points.map(item => [item.y, item.x])
			const polygon = L.polygon(points, style).addTo(toRaw(pageData.leaflet.map))
			polygon.bindTooltip(popupContent)
			geozonesList.push(polygon)
		}
		else {
			const points = geozone.points[0]
			const circle = L.circle([points.y, points.x], {radius: points.r, ...style }).addTo(toRaw(pageData.leaflet.map))
			circle.bindTooltip(popupContent)
			geozonesList.push(circle)
		}

	})
}

async function createLines(dateTime) {
	pageData.loading = true
	const from = moment(dateTime).add( -1.5,'h').unix()
	const to = moment(dateTime).unix()
	await pageData.wialon.executeReport(7381, from, to)
	pageData.loading = false

}

async function selectDay() {
	pageData.geozones = await getGeozones(pageData.currentDate)
	writeGeozonesToMap(pageData.geozones.length - 1)
}

onMounted(async () => {

	pageData.leaflet = new Leaflet(geozonemap.value)
	pageData.wialon = new Wialon(pageData.leaflet.map)
	pageData.wialon.onInit = () => selectDay()

})
</script>
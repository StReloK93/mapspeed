<template>
	<section class="fixed inset-0">
		<PreLoader :loading="pageData.loading" />
		<button @click="$emit('close')" class="absolute right-3 top-3 btn-line bg-white shadow-md !text-xl z-50">
			<i class="fa-sharp fa-light fa-xmark"></i>
		</button>
		<div class="absolute bottom-[105px] left-0 p-2 w-full z-50">
			<select class="px-4 py-1.5 rounded-full" v-model="pageData.currentDate" @change="selectDay()">
				<option v-for="n in 11">
					{{ moment().add(-(n - 1), 'd').format('YYYY-MM-DD') }}
				</option>
			</select>
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
import { onMounted, ref, reactive } from 'vue'
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
	clearGeozonesInMap()
	if (pageData.geozones.length == 0) return
	pageData.selected = index
	pageData.geozones[index].points.forEach((geozone) => {
		const coords = geozone.points[0]
		geozonesList.push(L.circle([coords.y, coords.x], {
			radius: coords.r,
			color: '#333',
			weight: 3,
			fillColor: "red",
			fillOpacity: 0.5
		}).addTo(pageData.leaflet.map))

	})
}

async function createLines() {
	const from = moment(`${pageData.currentDate} 00:00`).unix()
	const to = moment(`${pageData.currentDate} 23:59`).unix()
	await pageData.wialon.executeReport(7381, from, to)
}

async function selectDay() {
	pageData.loading = true
	await createLines()
	pageData.geozones = await getGeozones(pageData.currentDate)
	writeGeozonesToMap(pageData.geozones.length - 1)
	pageData.loading = false
}

onMounted(async () => {

	pageData.leaflet = new Leaflet(geozonemap.value)
	pageData.wialon = new Wialon(pageData.leaflet.map)
	pageData.wialon.onInit = () => selectDay()

})
</script>
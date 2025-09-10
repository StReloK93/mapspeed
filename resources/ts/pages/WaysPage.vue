<template>
	<section class="fixed inset-0">
		<PreLoader :loading="pageData.loading" />
		<RouterLink to="/"
			class="absolute left-3 top-3 btn-line bg-white shadow-md !text-xl z-50 text-center content-center">
			<i class="fa-duotone fa-house"></i>
		</RouterLink>
		<div class="absolute top-0 right-0 p-2 z-50 flex w-96 flex-col bg-blue-200/50 rounded-b-2xl">
			<button @click="clearData" class="bg-white px-4 py-1.5 rounded-full mb-2">Tozalash</button>
			<ChartLine ref="chartLineRef" />
			<div class="text-center text-xl">
				O'rtacha tezlik: {{ middleTotalSpeed }} Km/s
			</div>
			<VDatePicker v-model="range" mode="date" class="my-2" :is-range="true" expanded>
			</VDatePicker>
			<button @click="sendPoints" class="px-4 py-1.5 rounded-full bg-blue-500 text-white">
				<i v-if="pageData.loading" class="fa-sharp fa-regular fa-spinner fa-spin-pulse"></i>
				<span v-else>Tasdiqlash</span>
			</button>
		</div>
		<div ref="geozonemap" class="h-full w-full z-40"></div>
	</section>
</template>

<script setup lang="ts">
import WaysRepository from '@/entities/WaysRepository'
import moment from 'moment'
import ChartLine from '@/components/ChartLine.vue'
import Wialon from '@/modules/Wialon'
import Leaflet from '@/modules/Leaflet'
import { detectSmenaDay } from '@/modules/TimezoneDate'
import { onMounted, ref, reactive } from 'vue'
import PreLoader from '@/components/PreLoader.vue'
const geozonemap = ref()
const smena = detectSmenaDay(moment())
const middleTotalSpeed = ref(0)
const pageData = reactive({
	currentDate: smena.date,
	wialon: null,
	geozones: null,
	leaflet: null,
	loading: false,
	smena: smena.smena
})

const chartLineRef = ref()


const range = ref({
	start: null,
	end: null,
});

function clearData() {
	chartLineRef.value.getChartData([])
	pageData.leaflet?.rectanglesClear()
}

async function sendPoints() {
	pageData.loading = true
	const points = pageData.leaflet.getRectanglePoints()

	if (range.value.start == null || range.value.end == null) {
		alert('Kunni tanlang')
		return pageData.loading = false
	}

	if (points.length == 0) {
		alert("Yo'lni tanlang")
		return pageData.loading = false
	}
	const data = await WaysRepository.getWaysSpeed({
		startDay: moment(range.value.start).format('YYYY-MM-DD'),
		endDay: moment(range.value.end).format('YYYY-MM-DD'),
		points: points
	})
		.catch(() => {
			pageData.loading = false
		})

	if (data?.length) {
		const zero = data.reduce((sum, total) => sum + total.SpeedAvg, 0)
		middleTotalSpeed.value = Math.round(zero / data.length)
	}
	else middleTotalSpeed.value = 0

	chartLineRef.value.getChartData(data)
	pageData.loading = false
}

async function createLines(dateTime) {
	console.log(ENV);
	
	pageData.loading = true
	const from = moment(dateTime).add(-6, 'h').unix()
	const to = moment(dateTime).unix()
	await pageData.wialon.executeReport(ENV.BASE_ALLCARS_ID, from, to, ENV.REPORT_INDEX)
	pageData.loading = false
}

onMounted(async () => {
	pageData.leaflet = new Leaflet(geozonemap.value, 1)
	pageData.wialon = new Wialon(pageData.leaflet.map)

	pageData.wialon.onInit = () => createLines(new Date())
})
</script>
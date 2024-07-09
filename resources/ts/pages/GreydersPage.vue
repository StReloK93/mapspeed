<template>
	<section class="fixed inset-0">
		<PreLoader :loading="pageData.loading" />
		<RouterLink to="/" class="absolute right-3 top-3 btn-line bg-white shadow-md !text-xl z-50 text-center content-center">
			<i class="fa-sharp fa-light fa-xmark"></i>
		</RouterLink>
		<div class="absolute bottom-3 left-0 p-2 z-50">
			<input type="date" v-model="pageData.currentDate" @change="selectDay()" class="px-4 py-1.5 rounded-full">
		</div>

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




async function createLines(dateTime) {
	pageData.loading = true
	const from = moment(dateTime).add(-10, 'hours').unix()
	const to = moment(dateTime).unix()

	await pageData.wialon.greyderReport(from, to)
	pageData.loading = false

}

async function selectDay() {
	createLines(pageData.currentDate)
}

onMounted(async () => {

	pageData.leaflet = new Leaflet(geozonemap.value)
	pageData.wialon = new Wialon(pageData.leaflet.map)
	pageData.wialon.onInit = () => selectDay()

})
</script>
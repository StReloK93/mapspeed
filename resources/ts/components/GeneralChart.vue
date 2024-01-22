<template>
    <nav page class="w-full h-full flex">
        <header class="flex-grow relative">
            <div ref="chartdiv" class="h-full w-full border"></div>
            <PreLoader :loading="pageData.loading" />
        </header>
        <section class="w-64 flex items-center flex-col">
            <VDatePicker borderless color="gray" @update:modelValue="updateDate" v-model.range="range"
                :disabled-dates="[{ start: daysAgo(-1), end: null }]" timezone="Asia/Ashgabat" />
        </section>
    </nav>
</template>

<script setup lang="ts">
import { nextTick, onMounted, reactive, ref } from 'vue'
import moment from '@/modules/Moment'
import { formatDate, daysAgo, splitDayNightShifts, middleSpeed, chunkArray } from '@/modules/TimezoneDate'
// @ts-ignore
import Highcharts from 'highcharts'
import PreLoader from './PreLoader.vue'
const pageData = reactive({
    chart: null,
    loading: false,
})

const chartdiv = ref()
const range = ref({
    start: daysAgo(7),
    end: new Date(),
})

async function updateDate() {
    await nextTick()
    getData()
}


function getData() {
    pageData.loading = true

    axios.post('api/tracks', {
        startDay: formatDate(range.value.start, 'start'),
        endDay: formatDate(range.value.end, 'end'),
    }).then(({ data }) => {
        const days = splitDayNightShifts(data)

        pageData.chart.series[0].update({ data: days.map((day) => day.day_speed) }, true, true)
        pageData.chart.series[1].update({ data: days.map((day) => day.night_speed) }, true, true)
        pageData.chart.xAxis[0].update({ categories: days.map((day) => moment(day.date).format('D-MMM')) }, true, true)
        pageData.loading = false
    })
}
getData()

onMounted(() => {
    pageData.chart = Highcharts.chart(chartdiv.value, {
        accessibility: {
            enabled: false  // Отключение модуля доступности
        },
        chart: {
            type: 'column',
            zoomType: 'x'
        },
        title: { text: null },
        xAxis: {
            type: 'datetime',
        },
        yAxis: {
            title: { text: null }
        },
        series: [
            {
                name: "Kunduzgi smena",
                data: [],
                showInLegend: false,
                color: "orange"
            },
            {
                name: "Tungi smena",
                data: [],
                showInLegend: false,
                color: "darkblue"
            },
        ],
    })
})
</script>
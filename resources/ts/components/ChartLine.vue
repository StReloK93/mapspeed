<template>
    <main class="h-64 w-full" ref="chartLine"></main>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import Highcharts from 'highcharts'
function UTCTime<Number>(time: string) {
    const date = new Date(time);
    return Date.UTC(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
        date.getHours(),
        date.getMinutes()
    );
}

function getChartData(data) {
    if(data) chartConstructor.value.series[0].setData(data.map((byHour) => {
        return { y: byHour.SpeedAvg, x: UTCTime(byHour.Date) }
    }));
}


const chartLine = ref()
const chartConstructor = ref(null)
const chartOptions: any = {
    accessibility: {
        enabled: false
    },
    chart: {
        backgroundColor: "transparent",
        type: 'spline',
        scrollablePlotArea: {
            // minWidth: 600,
            // scrollPositionX: 1
        }
    },
    title: null,
    subtitle: null,
    xAxis: {
        gridLineColor: 'transparent',
        gridLineWidth: 0,

        lineWidth: 0,
        minorGridLineWidth: 10,
        type: 'datetime',
        labels: {
            overflow: 'justify'
        },
    },
    yAxis: {
        min: 0,
        max: 50,
        title: null,
        minorGridLineWidth: 0,
        gridLineWidth: 0,
        alternateGridColor: null,
    },
    tooltip: {
        valueSuffix: ' Km/s'
    },
    plotOptions: {
        spline: {
            lineWidth: 4,
            states: {
                hover: {
                    lineWidth: 5
                }
            },
            marker: {
                enabled: false
            },
            pointInterval: 3600000, // one hour
            pointStart: Date.UTC(2020, 3, 15, 0, 0, 0)
        }
    },
    series: [{
        name: "Tezlik smena bo'yicha",
        data: []

    }],
    navigation: {
        menuItemStyle: {
            fontSize: '10px'
        }
    }
}


defineExpose({ getChartData })



onMounted(() => {
    chartConstructor.value = Highcharts.chart(chartLine.value, chartOptions)
})
</script>
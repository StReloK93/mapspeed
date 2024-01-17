<template>
    <section class="absolute inset-0 p-20 z-50">
        <main class="bg-white h-full rounded-md shadow-md p-4">
            <canvas id="chartdiv" class="h-full w-full"></canvas>
        </main>
    </section>
    <!-- <img width="412px" height="268px"
        src="http://192.168.14.17/cgi-bin/nph-zms?mode=jpeg&monitor=97&scale=100&user=DASHBOARD_EKG&pass=dddd"> -->
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import Chart from 'chart.js/auto'
import { Colors } from 'chart.js'
onMounted(() => {

    new Chart('chartdiv', {
        type: 'bar',
        data: {
            labels: ['Hello', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange', 'hy'],
            datasets: [
                { label: '# of Votes', data: [12, 19, 3, 5, 2, 3, 32], },
                { label: '# of Votes', data: [12, 22, 33, 45, 12, 33], },
                { label: '# of Votes', data: [12, 9, 31, 25, 32, 13], },
                { label: '# of Votes', data: [12, 19, 3, 5, 2, 3], },
            ]
        },
        options: {
            responsive: true,
            plugins: {
                colors: {
                    enabled: true
                }
            },
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
})
</script>
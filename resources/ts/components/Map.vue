<template>
    <section class="h-full flex-grow relative">
        <button @click="$emit('call')" class="absolute right-20 top-3 btn-line bg-white shadow-md !text-xl z-20">
            <i class="fa-solid fa-hexagon"></i>
        </button>
        <TransitionGroup>
            <Charts v-if="chartToggle" @close="chartToggle = false" />
            <SpeedControl v-if="appStore.openControl" />
        </TransitionGroup>
        <button @click="chartToggle = true" class="absolute right-2 top-3 btn-line bg-white shadow-md !text-xl z-10">
            <i class="fa-regular fa-chart-mixed"></i>
        </button>
        <div ref="map" class="h-full w-full z-[1]"></div>
    </section>
</template>

<script setup lang="ts">
import Charts from './Charts.vue'
import SpeedControl from './SpeedControl.vue'
import Wialon from '@/modules/Wialon'
import Leaflet from '@/modules/Leaflet'
import { useAppStore } from '@/store/useAppStore'
import { onMounted, ref } from 'vue'
const chartToggle = ref(false)
const map = ref()
const appStore = useAppStore()



onMounted(async () => {
    const leaflet = new Leaflet(map.value)
    const wialon = appStore.UIData.customWialon = new Wialon(leaflet.map)

    wialon.onInit = (groups) => {
        if (groups.length == 0) return
        wialon.groupsUI(groups)
        appStore.withLoading(() => wialon.selectGroup(groups[0].getId()))
    }

    wialon.onSelectStart = () => {
        leaflet.removeCubics()
        leaflet.map.setView([42.2628699, 63.891215], 13)
    }

    wialon.onSelectEnd = (points) => leaflet.drawCubics(points)
})
</script>
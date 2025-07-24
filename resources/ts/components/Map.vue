<template>
    <section class="h-full flex-grow relative">
        <TransitionGroup>
            <!-- <Charts v-if="chartToggle" @close="chartToggle = false" /> -->
            <SpeedControl v-if="appStore.openControl" />
        </TransitionGroup>
        <RouterLink to="/" class="absolute left-3 top-3 btn-line bg-white shadow-md !text-xl z-50 text-center content-center">
            <i class="fa-duotone fa-house"></i>
        </RouterLink>
        <!-- <button @click="chartToggle = true" class="absolute right-2 top-2 btn-line bg-white shadow-md !text-xl z-10">
            <i class="fa-regular fa-chart-mixed"></i>
        </button> -->
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
const wialon = ref(null)

onMounted(async () => {
    const leaflet = new Leaflet(map.value)
    wialon.value = new Wialon(leaflet.map)

    appStore.UIData.wialon = wialon
    appStore.UIData.map = leaflet
    
    wialon.value.onInit = () => {
        appStore.withLoading(() => wialon.value.selectGroup(appStore.transport_groups[0]))
    }

    wialon.value.onSelectStart = () => {
        leaflet.removeCubics()
    }

    wialon.value.onSelectEnd = (points) => leaflet.drawCubics(points)
})
</script>
<template>
    <section class="h-full flex-grow relative">
        <TransitionGroup>
            <Charts v-if="chartToggle" @close="chartToggle = false" />
            <SpeedControl v-if="appStore.openControl" />
            <OffendersReportModal v-if="reportOffendersModal" :wialon="wialon" @close="reportOffendersModal = false" />
        </TransitionGroup>
        <RouterLink to="/greyders" class="absolute left-2 top-2 btn-line bg-white shadow-md !text-xl z-20 text-center content-center">
            <i class="fa-solid fa-truck-plow"></i>
        </RouterLink>

        <button @click="reportOffendersModal = true" class="absolute right-36 -translate-x-2 top-2 btn-line bg-white shadow-md !text-xl z-20">
            <i class="fa-solid fa-hexagon-exclamation"></i>
        </button>
        <RouterLink to="/geozones" class="absolute right-20 top-2 btn-line bg-white shadow-md !text-xl z-20  text-center content-center">
            <i class="fa-solid fa-hexagon"></i>
        </RouterLink>
        <button @click="chartToggle = true" class="absolute right-2 top-2 btn-line bg-white shadow-md !text-xl z-10">
            <i class="fa-regular fa-chart-mixed"></i>
        </button>
        <div ref="map" class="h-full w-full z-[1]"></div>
    </section>
</template>

<script setup lang="ts">
import OffendersReportModal from '@/components/OffendersReportModal.vue'
import Charts from './Charts.vue'
import SpeedControl from './SpeedControl.vue'
import Wialon from '@/modules/Wialon'
import Leaflet from '@/modules/Leaflet'
import { useAppStore } from '@/store/useAppStore'
import { onMounted, ref } from 'vue'
const chartToggle = ref(false)
const map = ref()
const appStore = useAppStore()
const reportOffendersModal = ref(false)

const wialon = ref(null)

onMounted(async () => {
    const leaflet = new Leaflet(map.value)
    wialon.value = new Wialon(leaflet.map)

    appStore.UIData.wialon = wialon
    appStore.UIData.map = leaflet
    
    wialon.value.onInit = () => {
        appStore.withLoading(() => wialon.value.selectGroup(appStore.transport_groups[0]))
        console.log('assad');
        
    }

    wialon.value.onSelectStart = () => {
        leaflet.removeCubics()
        leaflet.map.setView([42.2628699, 63.891215], 13)
    }

    wialon.value.onSelectEnd = (points) => leaflet.drawCubics(points)
})
</script>
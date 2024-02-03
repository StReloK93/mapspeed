<template>
    <section class="h-full flex-grow relative">
        <TransitionGroup>
            <Charts v-if="chartToggle" @close="chartToggle = false" />
            <SpeedControl v-if="appStore.openControl" />
        </TransitionGroup>
        <button @click="chartToggle = true" class="absolute right-2 top-3 btn-line bg-white shadow-md !text-xl z-10">
            <i class="fa-regular fa-chart-mixed"></i>
        </button>
        <div ref="map" class="h-full w-full"></div>
    </section>
</template>

<script setup lang="ts">
import Charts from './Charts.vue'
import SpeedControl from './SpeedControl.vue'
import Wialon from '@/modules/Wialon'
import { useAppStore } from '@/store/useAppStore'
import { onMounted , ref } from 'vue'
const chartToggle = ref(false)
const map = ref()
const appStore = useAppStore()



onMounted(async () => {
    const token = "94e3f3e1ac97def632645f3655f7c9325FBF8B37B9070360D58D2FC728179D2C5ABA96B9"
    wialon.core.Session.getInstance().initSession("http://wl.ngmk.uz")
    wialon.core.Session.getInstance().loginToken(token, "", (code) => {
        if (code) return
        const id = wialon.core.Session.getInstance().getId()
        appStore.UIData.customWialon = new Wialon(id, map.value)
    })
})
</script>
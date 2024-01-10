<template>
    <section class="relative">
        <HeaderButton :custom-wialon="customWialon" :UIData="UIData" />
        <PreLoader :loading="UIData.loading" />
        <SpeedColors />
        <main class="h-full overflow-y-auto p-2 absolute top-0 right-0 z-30 text-right flex flex-col items-end">
            <h3 class="font-semibold pb-2">Tezlik tushgan nuqtalar ( Km/s)</h3>
            <button
                v-for="point in appStore.points"
                :class="{ '!bg-gray-700 !text-white': point.active }"
                class="btn-line !border bg-white !px-2 mb-1 inline-block w-20 text-left" @click="customWialon.leafMap.fixedToPoint(point.center, point.image)"
            >
               <!-- <span class="inline-flex w-6 h-6 rounded-full items-center justify-center bg-gray-400 text-white">{{ point.item.QT }}</span>  -->
               <span class="font-bold">{{ point.item.SpeedAvg }}</span>
                <span class="text-gray-400 mx-1">dan</span> 
               <span class="font-bold">{{ point.item.SpeedAvgL }}</span>
               
            </button>
        </main>
        <div id="map" class="h-screen"></div>

    </section>
</template>

<script setup lang="ts">
import { useAppStore } from '@/store/useAppStore'
import PreLoader from './PreLoader.vue'
import HeaderButton from './HeaderButton.vue'
import SpeedColors from './SpeedColors.vue'
import Wialon from '@/modules/Wialon'
import { onMounted, reactive, ref } from 'vue'

const appStore = useAppStore()

const UIData = reactive({
    groups: [],
    active: null,
    loading: false,
})

const customWialon: any = ref(null)
onMounted(async () => {
    const token = "94e3f3e1ac97def632645f3655f7c9320F482674258FFE1B89D5296855D502E753290349"
    wialon.core.Session.getInstance().initSession("http://wl.ngmk.uz")
    wialon.core.Session.getInstance().loginToken(token, "", (code) => {
        if (code) return
        const id = wialon.core.Session.getInstance().getId()
        customWialon.value = new Wialon(id, UIData)
    })
})
</script>
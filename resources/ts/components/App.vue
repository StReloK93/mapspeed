<template>
    <section class="relative">
        <HeaderButton :custom-wialon="customWialon" :UIData="UIData" />
        <PreLoader :loading="UIData.loading" />
        <SpeedColors />
        <main class="flex h-screen">
            <div id="map" class="h-full flex-grow"></div>
            <main class="w-64 h-full overflow-y-auto p-2">
                <section class="bg-gray-100 text-gray-700 mb-2 px-3 py-1" @click="customWialon.leafMap.fixedToPoint(point.center)" v-for="point in appStore.points">
                   <span>{{ point.item.QT }} tonna </span> {{ point.item.SpeedAvg }} -  {{ point.item.SpeedAvgL }}
                </section>
            </main>
        </main>
    </section>
</template>

<script setup lang="ts">
import { useAppStore } from '@/store/useAppStore'
import PreLoader from './PreLoader.vue'
import HeaderButton from './HeaderButton.vue'
import SpeedColors from './SpeedColors.vue'
import Wialon from '@/modules/Wialon'
// import { initWialon } from '@/modules/Coordinate'
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
<template>
    <section class="p-1.5 h-screen">
        <PreLoader :loading="UIData.loading" />
        <Info />
        <main class="h-full w-full relative rounded-xl overflow-hidden flex">
            <SpeedColors />
            <div id="map" class="h-full flex-grow"></div>
            <MenuRight :custom-wialon="customWialon" :UIData="UIData" />
        </main>
    </section>
</template>

<script setup lang="ts">
import MenuRight from './MenuRight.vue'
import SpeedColors from './SpeedColors.vue'
import Info from './Info.vue'

import PreLoader from './PreLoader.vue'

import Wialon from '@/modules/Wialon'
import { onMounted, reactive, ref } from 'vue'


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
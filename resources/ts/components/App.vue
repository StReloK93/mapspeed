<template>
    <section class="p-1.5 h-screen">
        <PreLoader :loading="UIData.loading" />
        <Info />
        <main class="h-full w-full relative rounded-xl overflow-hidden flex">
            <SpeedColors />
            <!-- <Charts /> -->
            <Map :UIData="UIData" />
            <MenuRight :UIData="UIData" />
        </main>
    </section>
</template>

<script setup lang="ts">
import MenuRight from './MenuRight.vue'
import SpeedColors from './SpeedColors.vue'
import Info from './Info.vue'
import Charts from './Charts.vue'
import PreLoader from './PreLoader.vue'
import Map from './Map.vue'
import Wialon from '@/modules/Wialon'
import { onMounted, reactive, ref } from 'vue'


// axios.get('api/tracks').then(({data}) => {
//     console.log(data)
// })
//     .catch((error) => {
//     console.log(error)
    
// })
const UIData = reactive({
    groups: [],
    active: null,
    loading: false,
    customWialon: null,
})

onMounted(async () => {
    const token = "94e3f3e1ac97def632645f3655f7c9320F482674258FFE1B89D5296855D502E753290349"
    wialon.core.Session.getInstance().initSession("http://wl.ngmk.uz")
    wialon.core.Session.getInstance().loginToken(token, "", (code) => {
        if (code) return
        const id = wialon.core.Session.getInstance().getId()
        UIData.customWialon = new Wialon(id, UIData)
    })
})
</script>
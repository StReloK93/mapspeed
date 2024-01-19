<template>
    <section class="h-full flex-grow relative">
        <Transition>
            <Charts v-if="chartToggle" @close="chartToggle = false" />
        </Transition>
        <button @click="chartToggle = true" class="absolute right-3 top-3 btn-line bg-white shadow-md !text-xl z-10">
            <i class="fa-regular fa-chart-mixed"></i>
        </button>
        <div ref="map" class="h-full w-full"></div>
    </section>
</template>

<script setup lang="ts">
import Charts from './Charts.vue'
import Wialon from '@/modules/Wialon'
import { onMounted , ref } from 'vue'
const { UIData } = defineProps(['UIData'])
const chartToggle = ref(false)
const map = ref()

onMounted(async () => {
    const token = "94e3f3e1ac97def632645f3655f7c9320F482674258FFE1B89D5296855D502E753290349"
    wialon.core.Session.getInstance().initSession("http://wl.ngmk.uz")
    wialon.core.Session.getInstance().loginToken(token, "", (code) => {
        if (code) return
        const id = wialon.core.Session.getInstance().getId()
        UIData.customWialon = new Wialon(id, UIData, map.value)
    })
})
</script>
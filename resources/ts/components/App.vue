<template>
    <section class="relative">
        <main v-if="customWialon" class="absolute top-1 left-1 z-[100000] flex">
            <button 
                v-for="button in UIData.groups" 
                :class="{ 'bg-rose-500 !text-white': button.id == UIData.active }"
                @click="customWialon.executeReport(button.id, UIData)"
                class="border-2 border-red-500  text-red-500 shadow-sm px-3 py-1 text-xs mr-1 rounded-sm font-medium">
                {{ button.name }}
            </button>
        </main>
        <div id="map" class="h-screen"></div>
    </section>
</template>

<script setup lang="ts">
import Wialon from '@/modules/Wialon'
// import { initWialon } from '@/modules/Coordinate'
import { onMounted, reactive, ref } from 'vue'
const UIData = reactive({
    groups: [],
    active: null,
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
<template>
    <div id="map" class="h-full flex-grow"></div>
</template>

<script setup lang="ts">
import Wialon from '@/modules/Wialon'
import { onMounted } from 'vue'
const { UIData } = defineProps(['UIData'])

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
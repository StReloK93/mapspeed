<template>
    <section class="relative">
        <!-- <main class="absolute top-2 left-2 z-[100000] flex">
            <button class="bg-gray-300 shadow-sm px-3 py-1.5" @click="savePoints">
                Click me bro
            </button>
        </main> -->
        <div id="map" class="h-screen"></div>
    </section>
</template>

<script setup lang="ts">
import { createMap, drawSquare, toUnixTime, show_track } from '../modules/Coordinate'
import { onMounted, ref } from 'vue'
const eid = ref(null)
async function initMap(data) {
    const map = createMap(eid.value)
    data.forEach((item) => drawSquare(map, item, 50))
}

onMounted(async () => {
    const { data } = await axios.get("/api/tracks")
    const token = "f5289e1f1e82404625a8e440cc9cc362BA59F356797C7A58C077963A55E2E0259F6B271F"
    wialon.core.Session.getInstance().initSession("http://wl.ngmk.uz");
    wialon.core.Session.getInstance().loginToken(token, "", (code) => {
        if (code) return
        eid.value = wialon.core.Session.getInstance().getId()
        initMap(data)
    })
})
</script>
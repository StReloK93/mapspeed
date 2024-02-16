<template>
    <section class="p-1.5 h-screen">
        <Geozones v-if="geozone" @close="geozone = false" class="z-[1000] bg-black/50"/>
        <PreLoader :loading="store.UIData.loading" />
        <Info />
        <main class="h-full w-full relative rounded-xl overflow-hidden flex">
            <SpeedColors />
            <WialonMap @call="geozone = true" />
            <MenuRight />
        </main>
    </section>
</template>

<script setup lang="ts">
import MenuRight from './MenuRight.vue'
import SpeedColors from './SpeedColors.vue'
import Info from './Info.vue'
import PreLoader from './PreLoader.vue'
import WialonMap from './Map.vue'
import Geozones from '@/components/Geozones.vue'
import { ref } from 'vue'
import { useAppStore } from '@/store/useAppStore'
const store = useAppStore()
const geozone = ref(false)
</script>
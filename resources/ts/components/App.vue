<template>
    <section class="p-1.5 h-screen">
        <PreLoader :loading="appStore.UIData.loading" />
        <Info />
        <main class="h-full w-full relative rounded-xl overflow-hidden flex">
            <SpeedColors />
            <WialonMap />
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
import { useAppStore } from '@/store/useAppStore'
const appStore = useAppStore()
</script>
<template>
   <main class="h-full w-full relative rounded-xl overflow-hidden flex">
      <PreLoader :loading="store.UIData.loading" />
      <SpeedColors />
      <WialonMap />
      <MenuRight />
   </main>
</template>

<script setup lang="ts">
import MenuRight from '@/components/MenuRight.vue'
import SpeedColors from '@/components/SpeedColors.vue'
import PreLoader from '@/components/PreLoader.vue'
import WialonMap from '@/components/Map.vue'
import { useAppStore } from '@/store/useAppStore'
const store = useAppStore()
</script>
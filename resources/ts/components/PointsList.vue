<template>
    <main class="flex -mx-0.5 flex-col h-full">
        <h3 class="text-indigo-100 py-2 text-center">
            <i class="fa-solid fa-circle-small scale-50"></i>
            Tezlik tushgan nuqtalar
            <i class="fa-solid fa-circle-small scale-50"></i>
        </h3>
        <main class="w-full flex-grow relative">
            <aside class="absolute inset-0 overflow-y-auto flex items-start flex-wrap gap-y-1.5 content-start">
                <div @click="customWialon.leafMap.fixedToPoint(point.center, point.image)" v-for="(point) in appStore.points" class="w-1/3 px-1 cursor-pointer">
                    <main 
                        :class="{'!bg-gray-100 !text-gray-700': point.active }"
                        class="w-full bg-white/10 text-gray-300 h-12 flex overflow-hidden hover:bg-gray-100 hover:text-gray-700"
                    >
                        <div class="w-6 h-full bg-gray-700 text-white inline-flex justify-center items-center">
                            {{ point.index }}
                        </div>
                        <article class="flex-grow">
                            <div class="text-center">
                                {{ point.item.SpeedAvg }} <span class="text-xs">Km/s</span>
                            </div>
                            <div class="text-center">
                                {{ point.item.SpeedAvgL }} <span class="text-xs text-red-600">Km/s</span>
                            </div>
                        </article>
                    </main>
                </div>
            </aside>
        </main>
    </main>
</template>

<script setup lang="ts">
const { customWialon } = defineProps(['customWialon'])
import { useAppStore } from '@/store/useAppStore'
const appStore = useAppStore()
</script>
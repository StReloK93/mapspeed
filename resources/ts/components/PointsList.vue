<template>
    <main class="overflow-y-auto flex items-start flex-wrap -mx-0.5 gap-y-1 pt-2">
        <div v-for="(point) in appStore.points" class="w-1/3 px-0.5">
            <button
                :class="{'!bg-white !text-[#14284a] border-orange-600': point.active }"
                class="w-full py-1 bg-black/30 text-gray-300 pt-3 border border-[#14284a] relative overflow-hidden shadow shadow-gray-700/30"
                @click="customWialon.leafMap.fixedToPoint(point.center, point.image)"
            >
                <span class="absolute -top-1 -left-1 text-[10px] font-semibold bg-red-700/40 w-5 h-5 flex justify-center items-center rounded-full">
                    {{ point.index }}
                </span>
                <span>
                    {{ point.item.SpeedAvg }}
                </span>
                <span class="mx-1">
                    <i class="fa-duotone fa-right-long"></i>
                </span>
                <span>
                    {{ point.item.SpeedAvgL }}
                </span>
            </button>
        </div>
    </main>
</template>

<script setup lang="ts">
const { customWialon } = defineProps(['customWialon'])
import { useAppStore } from '@/store/useAppStore'
const appStore = useAppStore()
</script>
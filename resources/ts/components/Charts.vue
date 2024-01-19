<template>
    <section class="absolute inset-0 p-8 z-50 bg-black/45 flex justify-center items-center">
        <main class="bg-white rounded shadow-md p-2 w-[992px] h-[550px] flex flex-col overflow-hidden">
            <header class="flex justify-between items-center -m-2 mb-0 px-2 bg-slate-900 text-white">
                <div>
                    <button @click="page = 1" :class="{'border-white': page == 1}" class="active:bg-gray-50 px-2 h-10 active:bg-white/15 hover:bg-white/25 border-b-2 border-transparent">Barcha</button>
                    <button @click="page = 2" :class="{'border-white': page == 2}" class="active:bg-gray-50 px-2 h-10 active:bg-white/15 hover:bg-white/25 border-b-2 border-transparent">Gruppalar</button>
                </div>
                <div>
                    <button @click="$emit('close')" class="w-10 h-10 flex justify-center items-center active:bg-white/15 hover:bg-white/25">
                        <i class="fa-regular fa-xmark"></i>
                    </button>
                </div>
            </header>
            <div class="flex w-full flex-grow pt-2">
                <Transition>
                    <KeepAlive>
                        <component :is="currentPage" />
                    </KeepAlive>
                </Transition>
            </div>
        </main>
    </section>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import GeneralChart from '@/components/GeneralChart.vue'
import GroupChart from './GroupChart.vue'
const page = ref(1)


const currentPage = computed(() => {
    if (page.value == 1) return GeneralChart
    else if (page.value == 2) return GroupChart
})
</script>
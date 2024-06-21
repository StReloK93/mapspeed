<template>
    <section class="absolute inset-0 p-8 z-50 bg-black/45 backdrop-blur-sm flex justify-center items-center">
        <main class="bg-white rounded shadow-md min-w-[992px] max-w-[992px] h-[550px] flex flex-col overflow-hidden">
            <header class="flex justify-between items-center mb-0 px-2 bg-slate-900 text-white">
                <div></div>
                <div>
                    <button @click="$emit('close')"
                        class="w-10 h-10 flex justify-center items-center active:bg-white/15 hover:bg-white/25">
                        <i class="fa-regular fa-xmark"></i>
                    </button>
                </div>
            </header>
            <div class="flex w-full flex-grow flex-wrap content-between overflow-y-auto  p-3">
                <table class="w-full text-sm leading-4">
                    <tr>
                        <td class="border border-gray-300 px-2">Transport</td>
                        <td class="border border-gray-300 px-2">Qoida buzilgan vaqt</td>
                        <td class="border border-gray-300 px-2">Batafsil malumot</td>
                        <td class="border border-gray-300 px-2">Manzil</td>
                    </tr>
                    <tr v-for="row in tableRows">
                        <td class="border border-gray-300 px-2">{{row.c[1]}}</td>
                        <td class="border border-gray-300 px-2">{{row.c[2].t}}</td>
                        <td class="border border-gray-300 px-2">{{row.c[4].t}}</td>
                        <td class="border border-gray-300 px-2">{{row.c[5].t}}</td>
                    </tr>
                </table>
            </div>
        </main>
    </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import moment from 'moment'
const props = defineProps(['wialon'])

const to = moment().unix();
const from = to - 3600 * 24 - 1;
const tableRows = ref()

async function getTableRows() {
    tableRows.value = await props.wialon.offerdersReport(7381, from, to)
}
getTableRows()
</script>
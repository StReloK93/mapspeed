<template>
    <section class="h-full">
        <div class="flex flex-col h-full">
            <aside class="flex justify-between w-full items-center px-3 bg-gray-300">
                <div class="flex">
                    <main class="flex flex-col mr-5">
                        <input v-model="inputFrom" type="datetime-local" class="h-8 bg-transparent">
                    </main>
                    <main class="flex flex-col mr-5">
                        <input v-model="inputTo" type="datetime-local" class="h-8 bg-transparent">
                    </main>
                    <button @click="getTableRows" class="px-4 h-8 bg-slate-900 text-white rounded shadow-md">
                        Yangilash
                    </button>
                </div>
                <RouterLink to="/"
                    class="w-10 h-10 flex justify-center items-center active:bg-white/15 hover:bg-white/25">
                    <i class="fa-regular fa-xmark"></i>
                </RouterLink>
            </aside>
            <main class="flex-grow relative">
                <div class="absolute inset-0 overflow-y-auto">
                    <DxDataGrid :data-source="tableRows" @exporting="onExporting">
                        <DxExport :enabled="true" :allow-export-selected-data="true" />
                        <DxColumn data-field="transport" caption="Transport nomi"></DxColumn>
                        <DxColumn data-field="qoida" caption="Qoida buzilgan vaqt"></DxColumn>
                        <DxColumn data-field="batafsil" caption="Batafsil malumot"></DxColumn>
                        <DxColumn data-field="manzil"></DxColumn>
                    </DxDataGrid>
                </div>
            </main>
        </div>
    </section>
</template>

<script setup lang="ts">
import { onExporting } from '@/modules/ExportExcel'
import { DxDataGrid, DxColumn, DxExport } from 'devextreme-vue/data-grid';
import { onMounted, ref } from 'vue'
import Wialon from '@/modules/Wialon'
import moment from 'moment'
const wialon = ref()
const inputTo = ref(moment().format('YYYY-MM-DD HH:ss'));
const inputFrom = ref(moment().add(-1, 'days').format('YYYY-MM-DD HH:ss'));
const tableRows = ref()

async function getTableRows() {
    tableRows.value = await wialon.value.offerdersReport(7381, inputFrom.value, inputTo.value)
}
onMounted(() => {
    var map
    wialon.value = new Wialon(map)
    wialon.value.onInit = function () {
        getTableRows()
    }
})
</script>

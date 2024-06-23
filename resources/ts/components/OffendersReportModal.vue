<template>
    <section class="absolute inset-0 p-8 z-50 bg-black/45 backdrop-blur-sm flex justify-center items-center">
        <main class="bg-white rounded shadow-md min-w-[992px] max-w-[992px] max-h-[650px] flex flex-col overflow-hidden">
            <header class="flex justify-between items-center mb-0 px-2 bg-slate-900 text-white">
                <div></div>
                <div>
                    <button @click="$emit('close')"
                        class="w-10 h-10 flex justify-center items-center active:bg-white/15 hover:bg-white/25">
                        <i class="fa-regular fa-xmark"></i>
                    </button>
                </div>
            </header>
            <div class="flex w-full flex-grow flex-wrap content-start overflow-y-auto p-3">
                <aside class="flex">
                    <main class="flex flex-col mr-5">
                        <input v-model="inputFrom" type="datetime-local" class="h-8">
                    </main>
                    <main class="flex flex-col mr-5">
                        <input v-model="inputTo" type="datetime-local" class="h-8">
                    </main>

                    <button @click="getTableRows" class="px-4 h-8 bg-slate-900 text-white rounded shadow-md">
                        Yangilash
                    </button>
                </aside>
                <main>
                    <DxDataGrid
                        :data-source="tableRows"
                        @exporting="onExporting"
                        >
                        <DxExport :enabled="true" :allow-export-selected-data="true" />
                        <DxColumn data-field="transport" caption="Transport nomi"></DxColumn>
                        <DxColumn data-field="qoida" caption="Qoida buzilgan vaqt"></DxColumn>
                        <DxColumn data-field="batafsil" caption="Batafsil malumot"></DxColumn>
                        <DxColumn data-field="manzil"></DxColumn>
                    </DxDataGrid>
                </main>
            </div>
        </main>
    </section>
</template>

<script setup lang="ts">
import { onExporting } from '@/modules/ExportExcel'
import { DxDataGrid, DxColumn, DxExport } from 'devextreme-vue/data-grid';
import { onMounted, ref } from 'vue'
import moment from 'moment'

const props = defineProps(['wialon'])

const inputTo = ref(moment().format('YYYY-MM-DD HH:ss'));
const inputFrom = ref(moment().add(-1, 'days').format('YYYY-MM-DD HH:ss'));
const tableRows = ref()

async function getTableRows() {
    tableRows.value = await props.wialon.offerdersReport(7381, inputFrom.value, inputTo.value)
}
onMounted(() => {
    getTableRows()
})
</script>

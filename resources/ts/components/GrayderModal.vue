<template>
   <section @mouseup="$emit('close')"
      class="absolute inset-0 bg-black/40 z-[100] flex justify-center items-center p-10">
      <main @mouseup.stop class="bg-white w-full h-full rounded-md flex flex-col overflow-hidden">
         <header class="flex justify-end items-center px-2 bg-slate-900 text-white">
            <div>
               <button @click="$emit('close')"
                  class="w-10 h-10 flex justify-center items-center active:bg-white/15 hover:bg-white/25">
                  <i class="fa-regular fa-xmark"></i>
               </button>
            </div>
         </header>
         <main class="flex-grow relative">
            <div class="absolute inset-0 overflow-y-auto">
               <div class="flex pt-2 px-2">
                  <main class="flex flex-col mr-5">
                     <input v-model="inputFrom" type="datetime-local" class="h-8 bg-transparent">
                  </main>
                  <main class="flex flex-col mr-5">
                     <input v-model="inputTo" type="datetime-local" class="h-8 bg-transparent">
                  </main>
                  <button @click="getDataTable" class="px-2 bg-slate-900 text-white rounded-sm shadow-md">
                     Выполнить
                  </button>
               </div>
               <DxDataGrid v-if="tableValues.length" :data-source="tableValues" @exporting="onExporting">
                  <DxExport :enabled="true" :allow-export-selected-data="true" />
                  <DxColumn data-field="name" caption="Техника" width="120"></DxColumn>
                  <DxColumn data-field="active" caption="Статус"></DxColumn>
                  <DxColumn data-field="counts" caption="Количество зачищенных забоев"></DxColumn>
                  <DxColumn data-field="in_excavator" caption="Время в геозоне ЭКС (мин)"></DxColumn>
                  <DxColumn data-field="in_smena" caption="Доступное время в пересменку"></DxColumn>
                  <DxColumn data-field="in_not_excavator_move" caption="Вне геозоны ЭКС, в движении (мин)"></DxColumn>
                  <DxColumn data-field="in_not_excavator_stop" caption="Вне геозоны ЭКС, в ожидании (мин)"></DxColumn>
               </DxDataGrid>
            </div>
         </main>
      </main>
   </section>
</template>
<script setup lang="ts">
import { secondsToFormatTime } from '@/modules/TimezoneDate';
import { onExporting } from '@/modules/ExportExcel'
import { DxDataGrid, DxColumn, DxExport } from 'devextreme-vue/data-grid';
import moment from 'moment'
import Wialon from '@/modules/Wialon'
import { onMounted, ref } from 'vue';
const wialon = ref()
const tableValues = ref([])
const inputFrom = ref(moment().add(-1, 'days').format('YYYY-MM-DD HH:ss'));
const inputTo = ref(moment().format('YYYY-MM-DD HH:ss'));
var map
wialon.value = new Wialon(map)

async function getDataTable() {
   tableValues.value = []
   const object = await wialon.value.greyderTable(10587, moment(inputFrom.value).unix() , moment(inputTo.value).unix())

   for (const key in object) {
      tableValues.value.push({
         name: key,
         in_excavator: secondsToFormatTime(object[key]['time_in_excavator']),
         counts: object[key]['counts'].size,
         active: object[key]['counts'].size > 0 && object[key]['time_in_excavator'] > 0,
         in_smena: secondsToFormatTime(object[key]['in_smena']),
         in_not_excavator_move: secondsToFormatTime(object[key]['in_not_excavator_move']),
         in_not_excavator_stop: secondsToFormatTime(object[key]['in_not_excavator_stop']),
      })
   }
}

onMounted(async () => {
   getDataTable()
})
</script>
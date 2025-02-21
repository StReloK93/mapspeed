<template>
   <section @mouseup="$emit('close')"
      class="absolute inset-0 bg-black/40 z-[100] flex justify-center items-center p-10">
      <main @mouseup.stop class="bg-white w-full h-full rounded-md flex flex-col overflow-hidden relative">
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
               <div class="flex pt-2 px-2 items-start">
                  <PeriodPicker v-model:day="inputDate" v-model:smena="inputSmena" @submit="getDataTable" />
               </div>
               <DxDataGrid v-if="tableValues.length" :data-source="tableValues" @exporting="onExporting">
                  <DxExport :enabled="true" :allow-export-selected-data="true" />
                  <DxColumn data-field="name" caption="Техника" width="120"></DxColumn>
                  <DxColumn data-field="active" caption="Статус" cell-template="grid-cell" />
                  <template #grid-cell="{ data }">
                     <div v-if="data.data.active" style="color: red">В ремонте</div>
                     <div v-else style="color:green">В работе</div>
                  </template>
                  <DxColumn data-field="counts" caption="Кол-во зачищенных забоев" width="200"></DxColumn>
                  <DxColumn data-field="excavator_names" caption="Экскаватор" width="130"></DxColumn>
                  <DxColumn data-field="in_smena" caption="Доступное время в пересменку ЭКС" width="260"></DxColumn>
                  <DxColumn data-field="in_excavator" caption="Время в геозоне ЭКС (мин)"></DxColumn>
                  <DxColumn data-field="in_not_excavator_move" caption="Вне геозоны ЭКС, в движении (мин)"></DxColumn>
                  <DxColumn data-field="in_not_excavator_stop" caption="Вне геозоны ЭКС, без движении (мин)"></DxColumn>
               </DxDataGrid>
            </div>
            <div class="absolute bottom-0 w-full bg-gray-100 px-2 py-1.5 text-xl uppercase">
               количество зачищенных забоев на 1 ед. работающей техники - {{ zaboy }}  <br>
               Вне геозоны ЭКС, без движении % от доступного времени - {{ prosent }}%
            </div>
         </main>
      </main>
   </section>
</template>
<script setup lang="ts">
import PeriodPicker from '@/components/PeriodPicker.vue';
import { getDateAndSmena } from '@/modules/TimezoneDate';
import { onExporting } from '@/modules/ExportExcel'
import { DxDataGrid, DxColumn, DxExport } from 'devextreme-vue/data-grid';
import moment from 'moment'
import Wialon from '@/modules/Wialon'
import { onMounted, ref, computed } from 'vue';
const wialon = ref()
const tableValues = ref([])
const inputDate = ref(null)
const inputSmena = ref(null)
wialon.value = new Wialon()

const currentSmena = getDateAndSmena()
inputDate.value = currentSmena.date
inputSmena.value = currentSmena.smena

async function getDataTable() {
   tableValues.value = []
   const currentDay = moment(inputDate.value).format('YYYY-MM-DD')
   const periodTime = inputSmena.value == 1 ? {start: '08:30', end: '09:40'} : {start: '20:30', end: '21:40'}

   const object = await wialon.value.greyderTable(
      10587,
      moment(`${currentDay} ${periodTime.start}`).unix(),
      moment(`${currentDay} ${periodTime.end}`).unix()
   )

   for (const key in object) {
      const exNames = [...object[key]['counts']]

      var text = ""
      exNames.forEach(name => { text += `${name.replace('РВ Экскаватор', '')} `});

      tableValues.value.push({
         name: key,
         in_excavator: (object[key]['time_in_excavator']/60).toFixed(1) ,
         counts: object[key]['counts'].size,
         excavator_names: text,
         active:  object[key]['in_not_excavator_move'] == 0 &&
                  object[key]['in_not_excavator_stop'] == 0 &&
                  object[key]['time_in_excavator'] == 0,
         in_smena:  inputSmena.value == 1 ? '08:30 - 09:40 | 70 мин': '20:30 - 21:40 | 70 мин' ,
         in_not_excavator_move:  (object[key]['in_not_excavator_move']/60).toFixed(1),
         in_not_excavator_stop:  (object[key]['in_not_excavator_stop']/60).toFixed(1),
         excavator_move: object[key]['in_not_excavator_move'],
         excavator_stop: object[key]['in_not_excavator_stop'],
         excalibur: object[key]['time_in_excavator'],
      })
   }
}



const zaboy = computed(() => {
   const activeCars = tableValues.value.reduce((reduce, total) => total.active == false ? reduce += 1 : reduce, 0)
   const greyder = tableValues.value.reduce((reduce, total) => total.count != 0? reduce += total.counts : reduce, 0)
   return (greyder + activeCars == 0 ? 0 : greyder / activeCars).toFixed(1)
})

const prosent = computed(() => {
   const activeCars = tableValues.value.reduce((reduce, total) => total.active == false ? reduce += 1 : reduce, 0)
   const maxTime = activeCars * 70 * 60
   const stopmaxtime = tableValues.value.reduce((reduce, total) => total.excavator_stop != 0? reduce += total.excavator_stop : reduce, 0)
   return isNaN(stopmaxtime / maxTime) ? 0 : Math.round((stopmaxtime / maxTime) * 100) 
})


onMounted(() => {
   getDataTable()
})
</script>
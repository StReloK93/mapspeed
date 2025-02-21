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
                  <DxColumn data-field="name" caption="Техника" width="100"></DxColumn>
                  <DxColumn data-field="active" caption="Статус" cell-template="grid-cell" width="100" />
                  <template #grid-cell="{ data }">
                     <div v-if="data.data.active" style="color: red">В ремонте</div>
                     <div v-else style="color:green">В работе</div>
                  </template>
                  <DxColumn data-field="counts" caption="Кол-во зачищенных забоев" width="200"></DxColumn>
                  <DxColumn data-field="excavator_names" caption="Экскаватор"></DxColumn>
                  <DxColumn data-field="in_smena" caption="Доступное время в пересменку ЭКС" width="260"></DxColumn>
                  <DxColumn data-field="in_excavator" caption="Время в геозоне ЭКС (мин)"></DxColumn>
                  <DxColumn data-field="in_not_excavator_move" caption="Вне геозоны ЭКС, в движении (мин)"></DxColumn>
                  <DxColumn data-field="in_not_excavator_stop" caption="Вне геозоны ЭКС, без движении (мин)"></DxColumn>
                  <DxColumn data-field="excavator_stop" caption="Время в движении, % от доступного времени"></DxColumn>
               </DxDataGrid>
            </div>
         </main>
         <div class="absolute bottom-0 w-full bg-gray-100 px-2 py-1.5 text-xl uppercase">
            Время в движении, % от доступного времени: {{ maxProsent  + '%' }}
         </div>
         
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

const maxTime = 660

async function getDataTable() {
   tableValues.value = []
   const currentDay = moment(inputDate.value).format('YYYY-MM-DD')
   const periodTime = inputSmena.value == 1 ? {start: '08:30', end: '20:30'} : {start: '20:30', end: '08:30'}

   const startDate = moment(`${currentDay} ${periodTime.start}`).unix()
   const endDate = inputSmena.value == 2 ? moment(`${currentDay} ${periodTime.end}`).add(1, 'days').unix() : moment(`${currentDay} ${periodTime.end}`).unix()

   const object = await wialon.value.greyderTable(
      10587,
      startDate,
      endDate
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
         in_smena:  inputSmena.value == 1 ? `08:30 - 20:30 | ${maxTime} мин` : `20:30 - 08:30 | ${maxTime} мин`,
         in_not_excavator_move:  (object[key]['in_not_excavator_move']/60).toFixed(1),
         in_not_excavator_stop:  (object[key]['in_not_excavator_stop']/60).toFixed(1),
         excavator_stop: Math.round(((object[key]['time_in_excavator'] + object[key]['in_not_excavator_move']) / (maxTime * 60)) * 100) + '%',
         excavator_move: object[key]['in_not_excavator_move'],
         time_in_excavator: object[key]['time_in_excavator'],
      })
   }
}


const maxProsent = computed(() => {
   const activeCars = tableValues.value.reduce((reduce, total) => total.active == false ? reduce += 1 : reduce, 0)
   const in_excavator = tableValues.value.reduce((reduce, total) => total.time_in_excavator != 0? reduce += total.time_in_excavator : reduce, 0)
   const not_excavator= tableValues.value.reduce((reduce, total) => total.excavator_move != 0? reduce += total.excavator_move : reduce, 0)
   const fullSmenaTime = activeCars * maxTime * 60
   console.log(in_excavator , not_excavator , fullSmenaTime);

   
   return isNaN((in_excavator + not_excavator) / fullSmenaTime * 100) ? 0 : Math.round( (in_excavator + not_excavator) / fullSmenaTime * 100 )
})


onMounted(() => {
   getDataTable()
})
</script>
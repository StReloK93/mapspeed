<template>
   <section @mouseup="$emit('close')"
      class="absolute inset-0 bg-black/40 z-[100] flex justify-center items-center p-10">
      <main @mouseup.stop class="bg-white w-[992px] h-full rounded-md flex flex-col overflow-hidden relative">
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
               <main class="p-2 flex justify-between items-start">
                  <div>
                     <table class="table-auto">
                        <thead class="text-xl font-semibold">Анализ работы ДСМ</thead>
                        <tr>
                           <td>Смена</td>
                           <td>Кол-во зачищенных забоев</td>
                           <td>Среднее %, время вне движении</td>
                        </tr>
                        <tr v-for="(group, key) in bySmenaGroups">
                           <td>{{ key }}</td>
                           <td>{{ summator(group).counts }}</td>
                           <td>{{ summator(group).prosents }}%</td>
                        </tr>
                     </table>
                  </div>
                  <div class="flex flex-col">
                     <aside class="mb-1.5">
                        <label for="peresmenka">
                           <input type="radio" name="smena" id="peresmenka" v-model="smena" :value="0"> Пересменка
                        </label>
                        <label for="smenka">
                           <input type="radio" name="smena" id="smenka" v-model="smena" :value="1"> Вся смена
                        </label>
                     </aside>
                     <VDatePicker v-model.range="range" @update:modelValue="getGreyderjobs" mode="date"  />
                  </div>
               </main>
            </div>
         </main>
      </main>
   </section>
</template>
<script setup lang="ts">
import { onMounted, ref, computed } from 'vue';
import GreyderJobsRepository from '@/entities/GreyderJobsRepository';
import moment from 'moment';
const greyderJobs = ref([])
const smena = ref(0)
const range = ref({
   start: moment('2025-01-15').toDate(),
   end: moment('2025-01-25').toDate(),
});


const bySmenaGroups: any = computed(() => {
   const groupByJobs = {}
   const smenaLetters = [...new Set(greyderJobs.value.map(item => item.teamNum).sort())];

   smenaLetters.forEach(letter => {
      const smenas = greyderJobs.value.filter((job) => job.teamNum == letter)

      const reduced = smenas.reduce((accum, current) => {
         if (accum[current.day]) accum[current.day].push(current)
         else accum[current.day] = [current]
         return accum
      }, {})

      const totalWar = {}
      for (const day in reduced) {
         const arrayJobs = reduced[day];
         const activeCars = arrayJobs.reduce((reduce, total) => {
            const activate = total['in_not_excavator_move'] == 0 && total['in_not_excavator_stop'] == 0 && total['time_in_excavator']
            return activate == false ? reduce += 1 : reduce
         }, 0)

         const maxTime = activeCars * 70 * 60
         const stopmaxtime = arrayJobs.reduce((reduce, total) => total.in_not_excavator_stop != 0 ? reduce += total.in_not_excavator_stop : reduce, 0)

         const greyderJobs = arrayJobs.reduce((reduce, total) => {
            if (total.counts[0] == '') return reduce
            else return reduce += total.counts.length
         }, 0)
         totalWar[day] = {
            stop_prosent: isNaN(stopmaxtime / maxTime) ? 0 : Math.round((stopmaxtime / maxTime) * 100),
            jobs: greyderJobs
         }
      }

      groupByJobs[letter] = totalWar
   });


   return groupByJobs
})

interface ISummator {
   counts: number,
   prosents: number
}

interface IJobItem {
   jobs: number;
   stop_prosent: number;
}

function summator(objectJobs: Record<string, IJobItem>): ISummator {
   const summa: ISummator = {
      counts: 0,
      prosents: 0
   }
   for (const key in objectJobs) {
      const day = objectJobs[key];
      summa.counts += day.jobs
      summa.prosents += day.stop_prosent
   }

   summa.prosents = Math.round(summa.prosents / Object.keys(objectJobs).length)

   return summa
}


async function getGreyderjobs() {
   greyderJobs.value = await GreyderJobsRepository.analyze({
      startDate: moment(range.value.start).format('YYYY-MM-DD'),
      endDate: moment(range.value.end).format('YYYY-MM-DD'),
      type: smena.value
   })
}


onMounted(async () => {
   getGreyderjobs()
})
</script>
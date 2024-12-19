<template>
   <main class="relative" v-click-outside="() => modal = false">
      <button @click="modal = true" class="px-4 py-1.5 bg-slate-900 text-white rounded shadow-md">
         <span v-if="dayModel == null && smenaModel == null">
            Выберите Дату
         </span>
         <span v-else>
            {{ moment(dayModel).format('YYYY-MM-DD') }} СМЕНА : {{ smenaModel }}
         </span>
      </button>
      <div v-if="modal" @vue:mounted="opening" class="absolute bg-white z-50 top-11 left-0">
         <VDatePicker v-model="day" mode="date" :attributes='attrs' :disabled-dates="disabledDates"/>
         <main v-if="day" class="absolute inset-0 bg-black/40 z-50 flex justify-center items-center">
            <aside class="bg-white p-4 text-center rounded">
               <h3 class="mb-4 font-semibold">Выберите смену</h3>
               <button :class="{ 'bg-slate-900 !text-white': smena == 1 }"
                  class="bg-gray-200 text-black w-10 h-10 rounded shadow-sm" @click="smena = 1">1</button>
               <span class="mr-4"></span>
               <button :class="{ 'bg-slate-900 !text-white': smena == 2 }"
                  class="bg-gray-200 text-black w-10 h-10 rounded shadow-sm" @click="smena = 2">2</button>
            </aside>
         </main>
      </div>
   </main>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import moment from 'moment'
const emit = defineEmits(['submit'])
const modal = ref(false)
const day = ref(null)
const smena = ref(null)
const dayModel = defineModel('day')
const smenaModel = defineModel('smena')


const disabledDates = ref([{ start: new Date(new Date().getTime() + 24 * 60 * 60 * 1000), end: null }]);


function opening() {
   day.value = null
   smena.value = null
}

const attrs = ref([
   {
      key: 'today',
      highlight: true,
      dates: dayModel,
   },
]);

watch(() => smena.value, () => {
   if (day.value == null || smena.value == null) return
   dayModel.value = day.value
   smenaModel.value = smena.value
   modal.value = false
   emit('submit')
})
</script>
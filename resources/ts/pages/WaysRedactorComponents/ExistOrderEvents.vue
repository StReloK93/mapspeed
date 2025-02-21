<template>
   <div class="flex gap-1.5">
      <button type="button" @click="emit('selectedWayChange')" :disabled="props.pageData.selectedLoading == props.order"
         :class="[props.pageData.selectedLoading == order ? 'bg-teal-900 text-white' : 'bg-teal-500/15 text-teal-900 active:bg-teal-500/50 hover:bg-teal-500/30']"
         class="w-7 h-7 text-sm rounded">
         <i class="fa-solid fa-map"></i>
      </button>
      <button v-if="props.pageData.editable == props.order" type="submit"
         class="w-7 h-7 text-sm bg-teal-500/15 text-teal-900 rounded active:bg-teal-500/50 hover:bg-teal-500/30">
         <i class="fa-solid fa-floppy-disk"></i>
      </button>
      <button v-else type="button" @click="emit('editExistsOrder')"
         class="w-7 h-7 text-sm bg-teal-500/15 text-teal-900 rounded active:bg-teal-500/50 hover:bg-teal-500/30">
         <i class="fa-solid fa-pencil"></i>
      </button>
      <button @click="emit('deleteOrderWay')" type="button"
         class="w-7 h-7 text-sm bg-red-500/15 text-red-900 rounded active:bg-red-500/50 hover:bg-red-500/30">
         <i class="fa-duotone fa-solid fa-trash"></i>
      </button>
   </div>
</template>

<script setup lang="ts">
const props = defineProps(['pageData', 'order'])
const emit = defineEmits(['deleteOrderWay', 'editExistsOrder', 'selectedWayChange'])
</script>
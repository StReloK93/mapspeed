<template>
   <div class="flex gap-1.5">
      <button type="submit"
         class="w-7 h-7 text-sm bg-teal-500/20 text-teal-900 rounded active:bg-teal-500/50 hover:bg-teal-500/30">
         <i class="fa-solid fa-floppy-disk"></i>
      </button>
      <button @click="emit('delete')" type="button"
         class="w-7 h-7 text-sm bg-red-500/15 text-red-900 rounded active:bg-red-500/50 hover:bg-red-500/30">
         <i class="fa-duotone fa-solid fa-trash"></i>
      </button>
   </div>
</template>

<script setup lang="ts">
const emit = defineEmits(['delete'])
</script>
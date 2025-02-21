<template>
   <div class="flex-grow">
      <input type="text" :disabled="props.pageData.editable != order" v-model="props.order.name"
         class="w-full h-full bg-gray-100 px-2 rounded outline-none disabled:bg-transparent" required>
   </div>
</template>

<script setup lang="ts">
const props = defineProps(['pageData', 'order'])
</script>
<template>
    <Transition>
        <div v-if="props.loading" class="bg-black/30 absolute inset-0 z-[100] flex justify-center items-center">
            <span class="loader"></span>
        </div>
    </Transition>
</template>

<script setup lang="ts">
const props = defineProps(['loading'])
</script>
<template>
    <Transition>
        <div v-if="loading" class="bg-black/30 absolute inset-0 z-50 flex justify-center items-center">
            <span class="loader"></span>
        </div>
    </Transition>
</template>

<script setup lang="ts">
defineProps(['loading'])
</script>
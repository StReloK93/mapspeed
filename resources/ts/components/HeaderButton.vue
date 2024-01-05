<template>
    <main v-if="customWialon" class="absolute top-1 left-1 z-[20] flex">
        <button v-for="button in UIData.groups" :class="{ 'bg-gray-700 !text-white': button.id == UIData.active }"
            @click="customWialon.selectUnit(button.id, UIData)"
            class="border-2 border-gray-700  text-gray-700 shadow-sm px-3 py-1 text-sm mr-1 rounded-sm font-medium">
            {{ button.name }}
        </button>
    </main>
</template>

<script setup lang="ts">
defineProps(['customWialon', 'UIData'])
</script>
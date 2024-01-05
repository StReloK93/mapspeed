<template>
    <main v-if="customWialon" class="absolute top-1 left-1 z-[20] flex">
        <button v-for="button in UIData.groups" :class="{ 'bg-gray-700 !text-white': button.id == UIData.active }"
            @click="customWialon.selectUnit(button.id, UIData)"
            class="btn-line mr-1">
            {{ button.name }}
        </button>
    </main>
</template>

<script setup lang="ts">
defineProps(['customWialon', 'UIData'])
</script>
<template>
    <main v-if="UIData.customWialon" class="flex gap-1.5 flex-wrap flex-col absolute top-1/2 -translate-y-1/2 -left-16">
        <button 
            v-for="button in UIData.groups"
            :class="{ '!bg-[#14284a] !text-white': button.id == UIData.active }"
            @click="UIData.customWialon.selectUnit(button.id, UIData)"
            class="btn-line"
        >
            {{ button.name }}
        </button>
    </main>
</template>

<script setup lang="ts">
// 91 komatsu
// 92 Cat
defineProps(['UIData'])
</script>
<template>
    <main class="flex gap-1.5 flex-wrap flex-col absolute top-1/2 -translate-y-1/2 -left-16">
        <button 
            v-for="button in appStore.UIData.groups"
            :class="{ '!bg-slate-900 !text-white': button.id == appStore.UIData.active }"
            @click="selectUnit(button.id)"
            class="btn-line"
        >
            {{ button.name }}
        </button>
        <button
            :class="{ '!bg-slate-900 !text-white': appStore.openControl }"
            @click="appStore.openControl = true" class="btn-line">
            <i class="fa-duotone fa-gear text-xl"></i>
        </button>
    </main>
</template>

<script setup lang="ts">
import { useAppStore } from '@/store/useAppStore'
const appStore = useAppStore()

function selectUnit(group_id) {
    appStore.withLoading(() => appStore.UIData.customWialon.selectGroup(group_id))
}
</script>
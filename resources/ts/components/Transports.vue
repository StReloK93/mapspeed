<template>
    <main class="flex gap-1.5 flex-wrap flex-col absolute top-3 -left-16">
        <button :class="{ '!bg-slate-900 !text-white': appStore.openControl }" @click="appStore.openControl = true"
            class="btn-line">
            <i class="fa-duotone fa-gear text-xl"></i>
        </button>
    </main>
</template>

<script setup lang="ts">
import { useAppStore } from '@/store/useAppStore'
const appStore = useAppStore()
</script>
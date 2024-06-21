<template>
    <main class="flex gap-1.5 flex-wrap flex-col absolute top-1/2 -translate-y-1/2 -left-16">
        <button v-for="group in appStore.transport_groups"
            :class="{ '!bg-slate-900 !text-white': group.id == appStore.UIData.active }" @click="selectUnit(group)"
            class="btn-line">
            {{ group.name }}
        </button>
        <button :class="{ '!bg-slate-900 !text-white': appStore.openControl }" @click="appStore.openControl = true"
            class="btn-line">
            <i class="fa-duotone fa-gear text-xl"></i>
        </button>
    </main>
</template>

<script setup lang="ts">
import { useAppStore } from '@/store/useAppStore'
const appStore = useAppStore()

function selectUnit(group) {
    appStore.withLoading(() => appStore.UIData.wialon.selectGroup(group))
}
</script>
<template>
    <section class="w-80 bg-slate-900 h-full px-3 relative z-10">
        <Transports />
        <PointsList />
    </section>
</template>

<script setup lang="ts">
import Transports from './Transports.vue'
import PointsList from './PointsList.vue'
</script>
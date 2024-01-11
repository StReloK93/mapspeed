<template>
    <section class="w-[330px] bg-[#14284a] h-full z-30 p-3 relative">
        <Transports :custom-wialon="customWialon" :UIData="UIData" />
        <h3 class="text-indigo-100 font-semibold py-2">Tezlik tushgan nuqtalar (Km/s)</h3>
        <PointsList :custom-wialon="customWialon"/>
    </section>
</template>

<script setup lang="ts">
import Transports from './Transports.vue'
import PointsList from './PointsList.vue'
const { customWialon, UIData } = defineProps(['customWialon', 'UIData'])

</script>
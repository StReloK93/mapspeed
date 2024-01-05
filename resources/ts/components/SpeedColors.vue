<template>
    <div class="absolute bottom-1 left-1  text-center z-30 flex">
        <main v-for="color in colors" :class="color.color" class="w-14 text-sm text-white rounded-sm shadow-sm mr-1">
            {{color.speed}}
        </main>
    </div>
</template>

<script setup lang="ts">

const colors = [
    { speed: '0 - 4', color: 'bg-[rgb(248,0,0)]' },
    { speed: '5 - 9', color: 'bg-[rgb(248,96,0)]' },
    { speed: '10 - 14', color: 'bg-[#f8c800]' },
    { speed: '15 - 19', color: 'bg-[#60f880]' },
    { speed: '20 - 24', color: 'bg-[#10c050]' },
    { speed: '25 - 29', color: 'bg-[#187830]' },
    { speed: '30 - 34', color: 'bg-[#009830]' },
    { speed: '35 - 39', color: 'bg-[#0060c8]' },
    { speed: '40 - \u221E', color: 'bg-[#0000f8]' },
]
</script>
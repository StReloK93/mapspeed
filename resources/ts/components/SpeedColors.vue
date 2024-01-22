<template>
    <div class="absolute top-1/2 -translate-y-1/2 left-2 text-center z-30 flex flex-col h-5/6">
        <main v-for="speed in speeds" :class="[speed.border, speed.color]"
            class="w-1.5 h-[11%] text-sm relative text-white colorafter">
            <span class="absolute -top-2 left-6 font-semibold text-xs" :class="[speed.text]">
                {{ speed.speed }}
            </span>
        </main>
    </div>
</template>

<script setup lang="ts">
const speeds = [
    { speed: '0',  color: 'bg-[#f80000]', text: 'text-[#f80000]' , border: 'after:border-[#f80000]' },
    { speed: '5',  color: 'bg-[#f86000]', text: 'text-[#f86000]' , border: 'after:border-[#f86000]' },
    { speed: '10', color: 'bg-[#f8c800]', text: 'text-[#f8c800]' , border: 'after:border-[#f8c800]' },
    { speed: '15', color: 'bg-[#60f880]', text: 'text-[#60f880]' , border: 'after:border-[#60f880]' },
    { speed: '20', color: 'bg-[#10c050]', text: 'text-[#10c050]' , border: 'after:border-[#10c050]' },
    { speed: '25', color: 'bg-[#187830]', text: 'text-[#187830]' , border: 'after:border-[#187830]' },
    { speed: '30', color: 'bg-[#009830]', text: 'text-[#009830]' , border: 'after:border-[#009830]' },
    { speed: '35', color: 'bg-[#0060c8]', text: 'text-[#0060c8]' , border: 'after:border-[#0060c8]' },
    { speed: '40', color: 'bg-[#0000f8]', text: 'text-[#0000f8]' , border: 'after:border-[#0000f8]' },
]
</script>
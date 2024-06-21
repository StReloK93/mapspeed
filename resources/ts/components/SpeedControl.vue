<template>
    <section class="absolute inset-0 p-8 z-50 bg-black/45 backdrop-blur-sm flex justify-center items-center">
        <main class="bg-white rounded shadow-md p-5 min-w-[992px] max-w-[992px] h-[550px] flex flex-col overflow-hidden">
            <header class="flex justify-between items-center -m-5 mb-0 px-2 bg-slate-900 text-white">
                <div></div>
                <div>
                    <button @click="appStore.openControl = false"
                        class="w-10 h-10 flex justify-center items-center active:bg-white/15 hover:bg-white/25">
                        <i class="fa-regular fa-xmark"></i>
                    </button>
                </div>
            </header>
            <div class="flex w-full flex-grow flex-wrap content-between pt-2">
                <div class="w-full flex flex-wrap">
                    <main class="w-full mt-10 mb-4 px-10">
                        <div class="border-t-2 border-slate-900 relative h-6 border-dashed">
                            <aside class="absolute w-[206px] border-b right-[34px] -top-3 border-slate-900 border-dotted">
                                <i class="fa-thin fa-angle-left absolute -top-2 -left-px"></i>
                                <span class="absolute -top-6 left-1/2 -translate-x-1/2">
                                    B <span class="text-xs text-gray-400">Soat</span>
                                </span>
                                <i class="fa-thin fa-angle-right absolute -top-2 right-px"></i>
                            </aside>

                            <aside class="absolute w-[600px] border-b right-60 -top-3 border-slate-900 border-dotted">
                                <i class="fa-thin fa-angle-left absolute -top-2 -left-px"></i>
                                <span class="absolute -top-6 left-1/2 -translate-x-1/2">
                                    C <span class="text-xs text-gray-400">Kun</span>
                                </span>
                                <i class="fa-thin fa-angle-right absolute -top-2 right-px"></i>
                            </aside>

                            <nav class="absolute left-[30px] bottom-[13px] flex flex-col items-center">
                                <i class="fa-solid fa-pipe text-2xl"></i>
                            </nav>
                            <nav class="absolute right-60 bottom-[13px] flex flex-col items-center">
                                <i class="fa-solid fa-pipe text-2xl"></i>
                            </nav>
                            <nav class="absolute right-[16px] -bottom-[11px] flex flex-col items-center">
                                <i class="fa-solid fa-pipe text-2xl"></i>
                                <span class="relative -top-1">
                                    A <span class="text-xs text-gray-400">Vaqt</span>
                                </span>
                            </nav>
                        </div>
                    </main>
                    <main class="w-1/2 pr-2">
                        <aside class="mb-2">
                            <p class="text-gray-500 text-sm">
                                Tanlangan vaqt
                                <i class="fa-light fa-bracket-round"></i>
                                <span class="text-base text-gray-700 font-semibold">A</span>
                                <i class="fa-light fa-bracket-round-right"></i>
                            </p>
                            <input type="datetime-local" v-model="formData.selectedTime"
                                class="text-gray-800 w-full py-2 border-b outline-none">
                        </aside>
                        <aside class="mb-2">
                            <p class="text-gray-500 text-sm">
                                Tanlangan vaqt nechi soat oldin
                                <i class="fa-light fa-bracket-round"></i>
                                <span class="text-base text-gray-700 font-semibold">B</span>
                                <i class="fa-light fa-bracket-round-right"></i>
                            </p>
                            <select v-model="formData.hourPeriod" class="text-gray-800 w-full py-2 border-b outline-none">
                                <option v-for="n in 12">{{ n }}</option>
                            </select>
                        </aside>
                        <aside class="mb-2">
                            <p class="text-gray-500 text-sm">Oldingi necha kun bilan berilgan muddatni solishtirsin
                                <i class="fa-light fa-bracket-round"></i>
                                <span class="text-base text-gray-700 font-semibold">C</span>
                                <i class="fa-light fa-bracket-round-right"></i>

                            </p>
                            <select v-model="formData.oldDays" class="text-gray-800 w-full py-2 border-b outline-none">
                                <option v-for="n in 10">{{ n }}</option>
                            </select>
                        </aside>
                        <aside class="mb-2">
                            <p class="text-gray-500 text-sm">Tezlik farqi
                                <i class="fa-light fa-bracket-round"></i>
                                <span class="text-base text-gray-700 font-semibold">D</span>
                                <i class="fa-light fa-bracket-round-right"></i>
                            </p>
                            <select v-model="formData.speedRange" class="text-gray-800 w-full py-2 border-b outline-none">
                                <option v-for="n in 3">{{ n * 5 }}</option>
                            </select>
                        </aside>
                    </main>
                
                    
                    <main class="w-1/2 pl-2">
                        <h3 class="text-center text-[17px] font-semibold mb-3">Funksiyaning ishlash prinsipi haqida</h3>
                        <p class="text-gray-500 text-sm w-full">
                            Kon hududi xaritada 50x50m o'lchamdagi kataklarga bo'lingan.
                            Har bir katak uchun tanlangan
                            <i class="fa-light fa-bracket-round"></i>
                            <span class="text-base text-gray-700 font-semibold">A</span>
                            <i class="fa-light fa-bracket-round-right"></i>
                            vaqtdan boshlab, belgilangan
                            <i class="fa-light fa-bracket-round"></i>
                            <span class="text-base text-gray-700 font-semibold">B</span>
                            <i class="fa-light fa-bracket-round-right"></i>
                            soat oldingi vaqt oralig'ida avtoa'gdargichlarning o'rtacha tezligini hisoblaydi
                            va undan olgingi 
                            <i class="fa-light fa-bracket-round"></i>
                            <span class="text-base text-gray-700 font-semibold">C</span>
                            <i class="fa-light fa-bracket-round-right"></i>
                            kun ichidagi avtoa'gdargichlarning o'rtacha tezligini hisoblab solishtiriladi.
                            Solishtirilgan o'rtacha tezliklar farqi <b>D</b> ga teng yoki undan katta bo'lgan kataklar aniqlab beriladi.
                        </p>
                    </main>
                </div>
                <div class="w-full text-right">
                    <button @click="append"
                        class="bg-slate-900 text-white px-4 py-1.5 rounded-sm shadow active:bg-slate-70 hover:bg-slate-800 active:shadow-none">
                        <i class="fa-light fa-rotate-right mr-3"></i>
                        Yangilash
                    </button>
                </div>
            </div>
        </main>
    </section>
</template>

<script setup lang="ts">
import { useAppStore } from '@/store/useAppStore'
import { reactive } from 'vue'
const appStore = useAppStore()

const formData = reactive({
    oldDays: appStore.oldDays,
    hourPeriod: appStore.hourPeriod,
    selectedTime: appStore.selectedTime,
    speedRange: appStore.speedRange,
})

function append() {
    if (appStore.openControl == false) return
    appStore.oldDays = formData.oldDays
    appStore.hourPeriod = formData.hourPeriod
    appStore.selectedTime = formData.selectedTime
    appStore.speedRange = formData.speedRange

    appStore.withLoading(() => appStore.UIData.wialon.selectGroup(appStore.UIData.active))
    appStore.openControl = false
}
</script>
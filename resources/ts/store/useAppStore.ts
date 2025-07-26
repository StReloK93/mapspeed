import { defineStore } from 'pinia'
import { ref, computed, reactive } from 'vue'
export const useAppStore = defineStore('useAppStore', () => {
    const points = reactive([])
    const oldDays = ref(10)
    const hourPeriod = ref(0)
    const speedRange = ref(8)
    const selectedTime = ref(null)
    const openControl = ref(false)


    const time:any = computed(() => {
        if (selectedTime.value == null) return new Date()
        else return selectedTime
    })

    const UIData = reactive({
        active: null,
        loading: false,
        wialon: null,
        map: null,
    })

    async function withLoading(func:Function) {
        UIData.loading = true
        await func()
        UIData.loading = false
    }

    return { points, oldDays, hourPeriod, speedRange, selectedTime , time, openControl, UIData, withLoading }
})
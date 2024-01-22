import { defineStore } from 'pinia'
import { ref, computed, reactive } from 'vue'
export const useAppStore = defineStore('useAppStore', () => {
    const points = reactive([])
    const oldDays = ref(5)
    const hourPeriod = ref(6)
    const speedRange = ref(10)
    const selectedTime = ref(null)
    const openControl = ref(false)
    const time = computed(() => {
        if (selectedTime.value == null) return new Date()
        else return selectedTime
    })

    const UIData = reactive({
        groups: [],
        active: null,
        loading: false,
        customWialon: null,
    })
    

    async function withLoading(func:Function) {
        UIData.loading = true
        await func()
        UIData.loading = false
    }

    return { points, oldDays, hourPeriod, speedRange, selectedTime , time, openControl, UIData, withLoading }
})
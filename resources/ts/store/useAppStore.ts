import { defineStore } from 'pinia'
import { ref, computed, reactive } from 'vue'
export const useAppStore = defineStore('useAppStore', () => {
    const points = reactive([])
    const oldDays = ref(5)
    const hourPeriod = ref(6)
    const speedRange = ref(10)
    const selectedTime = ref(null)

    const time = computed(() => {
        if (selectedTime.value == null) return new Date()
        else return selectedTime
    })
    
    return { points, oldDays, hourPeriod, speedRange, selectedTime , time}
})
import { defineStore } from 'pinia'
import { ref, computed, reactive } from 'vue'
export const useAppStore = defineStore('useAppStore', () => {
    const points = reactive([])
    const oldDays = ref(5)
    const hourPeriod = ref(6)
    const speedRange = ref(10)
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
    

    const transport_groups = [
        { id: SERVER_DATA.BASE_ALLCARS_ID, name: "Barcha" },
        { id: SERVER_DATA.BASE_T55_ID, name: "55" },
        { id: SERVER_DATA.BASE_T90_ID, name: "90" },
        { id: SERVER_DATA.BASE_KOMATSU_ID, name: "Komatsu" }, /* '91' */
        { id: SERVER_DATA.BASE_CAT_ID, name: "CAT"},  /* '92' */
    ]

    async function withLoading(func:Function) {
        UIData.loading = true
        await func()
        UIData.loading = false
    }

    return { points, oldDays, hourPeriod, speedRange, selectedTime , time, openControl, UIData, withLoading, transport_groups }
})
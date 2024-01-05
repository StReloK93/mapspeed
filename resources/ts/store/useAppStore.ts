import { defineStore } from 'pinia'
import { ref , computed, reactive } from 'vue'
export const useAppStore = defineStore('useAppStore', () => {
    const points = reactive([])

    return { points }
})
import type { SportState, Sports } from '@/types'
import { defineStore } from 'pinia'
export const useSportStore = defineStore('sport', {
    state: (): SportState => ({
        sport: null
    }),
    actions: {
        setSport(sport: Sports): void {
            this.sport = sport
        }
    }
})
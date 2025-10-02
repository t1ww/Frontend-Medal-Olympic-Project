import type { CountrySportState, CountrySport } from '@/types'
import { defineStore } from 'pinia'
export const useCountryStore = defineStore('country', {
    state: (): CountrySportState => ({
        countrySport: null
    }),
    actions: {
        setCountry(countrySport: CountrySport): void {
            this.countrySport = countrySport
        }
    }
})
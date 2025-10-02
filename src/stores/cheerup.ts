import { defineStore } from 'pinia'
export const cheerupStore = defineStore('message', {
    state: () => ({
        cheerup: [] as { id: string, message: string, name: string }[]
    }),
    actions: {
        addCheerup(id: string, message: string, name: string) {
            this.cheerup.push({ id, message, name });
        }
    }
})
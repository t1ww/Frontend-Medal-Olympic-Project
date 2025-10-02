<script setup lang="ts">

import { useCountryStore } from '@/stores/country'
import { storeToRefs } from 'pinia'

const store = useCountryStore ()
const { country } = storeToRefs (store)

</script>
<template>
    <div v-if="country">
        <nav class="py-6 p-[30px] flex justify-start items-center space-x-10 bg-[#EAEAEA] mb-5">
            <RouterLink class="font-bold text-[#252A34]" exact-active-class="text-[#FF2E63]" :to="{ name: 'country-detail-view' }">Details & Sports</RouterLink>
            
            <RouterLink class="font-bold text-[#252A34]" exact-active-class="text-[#FF2E63]" :to="{ name: 'country-cheerup-view' }">Cheer-up</RouterLink>
        </nav>
        <RouterView :country="country" />
    </div>
</template>


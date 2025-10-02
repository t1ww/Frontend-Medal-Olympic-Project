<script setup lang="ts">
import { type Country, type CountrySport } from '@/types'
import { toRefs, defineProps, computed, ref, onMounted, watchEffect } from 'vue'
import SportList from '@/components/SportList.vue'
import { useRouter, useRoute } from 'vue-router'
import CountryService from '@/services/CountryService'
import CountrySportService from '@/services/CountrySportService'
import { storeToRefs } from 'pinia'
import { cheerupStore } from '@/stores/cheerup'

// Router setup
const route = useRoute()
const router = useRouter()

// Pinia store for cheer-up messages
const store = cheerupStore()
const { cheerup } = storeToRefs(store)

// Filter cheer-up messages based on the country ID
const filterdCheerup = computed(() =>
  cheerup.value?.filter(
    (cheerupItem: { id: number }) => cheerupItem.id === props.country.id
  ) ?? []
)

// Props definitions
const props = defineProps<{
  country: Country
}>()
const { country } = toRefs(props)

// Navigation to sport form
const navigateToSportForm = () => {
  router.push({ 
    name: 'sport-form-with-country', 
    params: { countryId: country.value.id } 
});
}
</script>

<template>
  <div class="bg-[#252A34] text-[#EAEAEA]">
    <div class="w-auto inline-block mt-5 rounded-lg">
      <h1 class="p-4 mb-0 bg-[#FF2E63] rounded-t-lg font-sans text-lg sm:text-xl md:text-2xl lg:text-3xl">
        <span class="font-bold">{{ country.name }} ({{ country.code }})</span>
      </h1>
      <div class="leading-8 flex flex-col sm:flex-row items-center justify-around px-4 mt-3">
        <div class="flex justify-center my-6 pr-5">
          <img
            class="border border-gray-200 w-full sm:w-3/4 md:w-1/2 lg:w-1/3"
            :src="country.flagUrl"
            :alt="`Flag of ${country.name}`"
          />
        </div>
        <div class="text-left text-sm sm:text-base md:text-lg">
          <p><span class="font-bold">Area:</span> {{ country.area }}</p>
          <p><span class="font-bold">Capital:</span> {{ country.capital }}</p>
          <p><span class="font-bold">National Language:</span> {{ country.nationalLanguage }}</p>
          <p><span class="font-bold">Population:</span> {{ country.population }}</p>
          <p><span class="font-bold">Continent:</span> {{ country.continent }}</p>
        </div>
      </div>

      <div class="w-full max-w-4xl overflow-x-auto mt-5 divide-y divide-black">
        <div class="mb-3 m-10 mb-10">
          <button
              @click="navigateToSportForm"
              class="px-10 py-6 bg-[#FF2E63] rounded hover:bg-[#FF4B7E]"
            >
            <font-awesome-icon :icon="['fas', 'plus']" /> Add Sport
          </button>
        </div>

        <div class="items-cente">
          <h1 class="rounded-t-lg p-4 m-0 bg-[#08D9D6] text-lg font-bold text-[#252A34]">Participated Sports</h1>
        </div>
        
        <table class="w-full bg-[#252A34]">
          <thead class="bg-[#08D9D6] text-[#252A34]">
            <tr>
              <th class="p-3 text-center"><font-awesome-icon :icon="['fas', 'award']" /> Sport</th>
              <th class="p-3 text-center"><font-awesome-icon :icon="['fas', 'medal']" style="color: #FFD43B;" /> Gold </th>
              <th class="p-3 text-center"><font-awesome-icon :icon="['fas', 'medal']" style="color: #d1cfc7;" /> Silver</th>
              <th class="p-3 text-center"><font-awesome-icon :icon="['fas', 'medal']" style="color: #e6c494;" /> Bronze</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="sport in country.countrySports"
              :key="sport.id"
              class="border-b border-[#EAEAEA]"
            >
              <!-- Sport Column -->
              <td class="text-center p-3">{{ sport.sportName }}</td>
              <!-- Gold Column -->
              <td class="text-center p-3">{{ sport.gold }}</td>
              <!-- Silver Column -->
              <td class="text-center p-3">{{ sport.silver }}</td>
              <!-- Bronze Column -->
              <td class="text-center p-3">{{ sport.bronze }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="w-full max-w-4xl overflow-x-auto mt-12">
        <h1 class="p-4 bg-[#EAEAEA] text-black text-lg font-bold">Cheer-up messages</h1>
        <div v-if="filterdCheerup.length === 0" class="p-4 my-2">
          <p>No one has cheered us yet :(</p>
          <p>Be the first one to do it! :D</p>
        </div>
        <div
          v-for="cheerupItem in filterdCheerup"
          :key="cheerupItem.id"
          class="border-b p-4 my-2"
        >
          <p><span class="font-bold">{{ cheerupItem.name }} says:</span></p>
          <p>"{{ cheerupItem.message }}"</p>
        </div>
      </div>
    </div>
  </div>
</template>

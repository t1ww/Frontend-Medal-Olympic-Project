<script setup lang="ts">
import { type Country } from '@/types'
import { ref, onMounted, computed, watchEffect, watch } from 'vue'
import CountryService from '@/services/CountryService'
import { useRoute, useRouter } from 'vue-router'
import BaseInput from '@/components/BaseInput.vue';
import UserList from '@/components/UserList.vue'

const route = useRoute()
const router = useRouter()

const country = ref<Country[] | null>(null)
const totalCountry = ref(0)

const props = defineProps({
  page: {
    type: Number,
    required: true
  },
  pageSize: {
    type: Number,
    required: true
  }
})

const pageSize = ref(props.pageSize)

const page = computed(() => props.page)
onMounted(() => {
  watchEffect(() => {
    updateKeyword()
  })
})

const hasNexPage = computed(() => {
  const totalPages = Math.ceil(totalCountry.value / pageSize.value)
  return page.value < totalPages
})

const keyword= ref('')
  
  function updateKeyword(value: string) {
    let queryFunction;
    if (keyword.value === '') {
      queryFunction = CountryService.getCountry(pageSize.value, page.value)
    }else {
      queryFunction = CountryService.getCountryByKeyword(keyword.value, 3, page.value)
    }
    queryFunction.then((response) => {
      country.value = response.data
      console.log('country', country.value)
      totalCountry.value = response.headers['x-total-count']
      console.log('totalcountry', totalCountry.value)
    }).catch(() => {
      router.push({ name: 'NetworkError' })
    })
  }

</script>

<template>
  <div class="bg-[#252A34] min-h-screen py-8 shadow-md">
    <div class="flex flex-col items-center">
      <div class="w-full max-w-4xl mb-4">
        <div class="flex flex-col sm:flex-row justify-between items-center mb-4">
          
          <div class="flex space-x-4">
            <RouterLink
              class="px-4 py-2 bg-[#252A34] text-[#EAEAEA] rounded hover:bg-[#FF2E63]"
              :to="{ name: 'medal-list-view', query: { page: page - 1 } }"
              v-if="page != 1"
            >
              Prev Page
            </RouterLink>
            <RouterLink
              class="px-4 py-2 bg-[#252A34] text-[#EAEAEA] rounded hover:bg-[#FF2E63]"
              :to="{ name: 'medal-list-view', query: { page: page + 1 } }"
              v-if="hasNexPage"
            >
              Next Page
            </RouterLink>
          </div>
        </div>
      </div>

      <div class="w-full max-w-4xl overflow-x-auto">
        <table class="w-full bg-[#252A34] shadow-md rounded-lg overflow-hidden">
          <thead class="bg-[#FF2E63] text-[#EAEAEA]">
            <tr>
              <th class="p-3 text-center">ID</th>
              <th class="p-3 text-center">Username</th>
              <th class="p-3 text-center">Email</th>
              <th class="p-3 text-center">Role</th>
              <th class="p-3 text-center">Promote</th>
              <th class="p-3 text-center">Demote</th>
            </tr>
          </thead>
          <tbody>
            <UserList 
              v-for="country in country" 
              :key="country.id" 
              :country="country"
            />
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

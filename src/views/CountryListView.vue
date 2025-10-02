<script setup lang="ts">
import CountryList from '@/components/CountryList.vue';
import { type Country } from '@/types';
import { ref, computed, onMounted, watchEffect } from 'vue';
import CountryService from '@/services/CountryService';
import { useRoute, useRouter } from 'vue-router';
import BaseInput from '@/components/BaseInput.vue';

const route = useRoute();
const router = useRouter();

const countries = ref<Country[]>([]);
const totalCountry = ref(0);

const currentPage = ref(Number(route.query.page) || 1);
const pageSize = ref(Number(route.query.pageSize) || 10);
const sortBy = ref(route.query.sortBy || 'ranking');
const order = ref(route.query.order || 'asc');
const keyword = ref(route.query.keyword || '');

// Fetch countries based on current parameters
const fetchCountries = async () => {
  try {
    const response = await CountryService.getCountries(
      pageSize.value,
      currentPage.value,
      sortBy.value,
      order.value,
      ''
    );
    countries.value = response.data;
    totalCountry.value = response.headers['x-total-count'];
  } catch (error) {
    console.error('Failed to load countries:', error);
    router.push({ name: 'NetworkError' });
  }
};

// Fetch countries using keyword search
const fetchCountriesByKeyword = async () => {
  try {
    const response = await CountryService.getCountryByKeyword(
      keyword.value,
      pageSize.value,
      currentPage.value
    );
    countries.value = response.data;
    totalCountry.value = response.headers['x-total-count'];
  } catch (error) {
    console.error('Failed to load searched countries:', error);
    router.push({ name: 'NetworkError' });
  }
};

// Watch for changes to parameters and update router query
watchEffect(() => {
  router.push({
    query: {
      page: currentPage.value,
      pageSize: pageSize.value,
      sortBy: sortBy.value,
      order: order.value,
      keyword: keyword.value,
    },
  });

  if (keyword.value.trim() === '') {
    fetchCountries();
  } else {
    fetchCountriesByKeyword();
  }
});

// Handle search button click: Reset page to 1 and perform search
const handleSearch = () => {
  currentPage.value = 1; // Reset page to 1
  fetchCountriesByKeyword(); // Trigger search
};

// Compute total pages and next/prev page availability
const totalPages = computed(() => Math.ceil(totalCountry.value / pageSize.value));
const hasNextPage = computed(() => currentPage.value < totalPages.value);
const hasPrevPage = computed(() => currentPage.value > 1);

// Navigate to next or previous page
const goToNextPage = () => {
  if (hasNextPage.value) currentPage.value += 1;
};
const goToPreviousPage = () => {
  if (hasPrevPage.value) currentPage.value -= 1;
};

// Update page size and reset to page 1
const updatePageSize = (size: number) => {
  pageSize.value = size;
  currentPage.value = 1; // Reset page to 1 when page size changes
};

// Navigate to the country form
const navigateToCountryForm = () => {
  router.push({ name: 'country-form' });
};

// Reset sorting to default
const resetSorting = () => {
  sortBy.value = 'ranking';
  order.value = 'asc';
  fetchCountries();
};
</script>

<template>
  <div class="bg-[#252A34] min-h-screen py-8 shadow-md">
    <div class="flex flex-col items-center">
      <div class="w-full max-w-4xl mb-4">
        
        <div class="flex flex-col justify-between items-center mb-3">
           <h1 class="text-5xl font-bold text-center text-[#08D9D6]">MEDAL TABLE</h1>
        </div>

        <div class="flex flex-col sm:flex-row justify-between items-center mb-3">
          <div class="mb-2">
            <!-- Sorting Dropdowns -->
              <label class="mr-2" for="sortBy">Sort:</label>
              <select class="border rounded px-4 py-2 hover:cursor-pointer w-[350px] text-[#252A34] focus:ring-2 focus:ring-[#08D9D6]" v-model="sortBy">
                <option value="ranking">Ranking</option>
                <option value="totalMedals">Total Medals</option>
                <option value="name">Country Name</option>
              </select>
            </div>
            <div class="mb-2">
              <label class="mr-2" for="order">Order:</label>
              <select class="border rounded px-4 py-2 hover:cursor-pointer w-[340px] text-[#252A34] focus:ring-2 focus:ring-[#08D9D6]" v-model="order">
                <option value="asc">Ascending <font-awesome-icon :icon="['fas', 'arrow-up']" style="color: #FFD43B;" />  </option>
                <option value="desc">Descending <font-awesome-icon :icon="['fas', 'arrow-donw']" /></option>
              </select>
          </div>
          <div class="mb-2">
              <button @click="resetSorting" class="px-4 py-3 text-sm bg-gray-700 text-white rounded hover:bg-[#FF4B7E] mb-4 sm:mb-0">
                Reset
              </button>
          </div>
          
        </div>
        <div class="flex flex-col sm:flex-row justify-between items-center mb-3">
           <!-- Page Size Selector -->
          <form class="mb-2">
            <label for="pageSizeSelect" class="mr-2">Countries per page:</label>
            <select
              id="pageSizeSelect"
              class="border rounded p-1 hover:cursor-pointer w-[60px] text-[#252A34] focus:ring-2 focus:ring-[#08D9D6]"
              v-model="pageSize"
              @change="updatePageSize(pageSize)"
            >
              <option :value="5">5</option>
              <option :value="10">10</option>
              <option :value="totalCountry">All</option>
            </select>
          </form>

          <!-- Pagination Controls -->
          <div class="flex space-x-4">
            <button
              v-if="hasPrevPage"
              class="px-4 py-2 bg-[#252A34] text-[#EAEAEA] rounded hover:bg-[#FF2E63]"
              @click="goToPreviousPage"
            >
            <font-awesome-icon :icon="['fas', 'arrow-left']" size="2xs" /> Prev Page 
            </button>

            <button
              v-if="hasNextPage"
              class="px-4 py-2 bg-[#252A34] text-[#EAEAEA] rounded hover:bg-[#FF2E63]"
              @click="goToNextPage"
            >
              Next Page <font-awesome-icon :icon="['fas', 'arrow-right']" size="2xs" />
            </button>
          </div>
        </div>
      </div>

      <!-- Search Input and Button -->
      <div class="w-full max-w-4xl overflow-x-auto mb-4">
        <div class="flex">
          <BaseInput
            v-model="keyword"
            type="text"
            label="Search"
            class="w-full text-back rounded-l-lg focus:ring-2 focus:ring-[#08D9D6]"
          />
          <button
            @click="handleSearch"
            class="px-5 py-3 bg-[#FF2E63] text-[#EAEAEA] rounded-r-lg hover:bg-[#FF4B7E]"
          > 
          <font-awesome-icon :icon="['fas', 'magnifying-glass']" /> 
          </button>
        </div>
      </div> 

      <!-- Countries Table -->
      <div class="w-full max-w-4xl overflow-x-auto">
        <table class="w-full bg-[#252A34] shadow-md rounded-lg overflow-hidden">
          <thead class="bg-[#FF2E63] text-[#EAEAEA]">
            <tr>
              <th class="p-3 text-left"><font-awesome-icon :icon="['fas', 'ranking-star']" /> Rank</th>
              <th class="p-3 text-left"><font-awesome-icon :icon="['fas', 'earth-americas']" /> NOCs</th>
              <th class="p-3 text-center"><font-awesome-icon :icon="['fas', 'medal']" style="color: #FFD43B;" /> Gold</th>
              <th class="p-3 text-center"><font-awesome-icon :icon="['fas', 'medal']" style="color: #d1cfc7;" /> Silver</th>
              <th class="p-3 text-center"><font-awesome-icon :icon="['fas', 'medal']" style="color: #e6c494;" /> Bronze</th>
              <th class="p-3 text-center"><font-awesome-icon :icon="['fas', 'trophy']" /> Total</th>
            </tr>
          </thead>
          <tbody>
            <CountryList
              v-for="country in countries"
              :key="country.id"
              :country="country"
            />
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

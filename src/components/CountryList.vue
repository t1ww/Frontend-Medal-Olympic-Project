<script setup lang="ts">
import { type Country } from '@/types'
defineProps<{
  country: Country
}>()
</script>

<template>
  <tr
    class="border-b border-[#EAEAEA] hover:bg-[#08D9D6] hover:text-[#252A34] transition-all duration-300"
  >
    <td class="p-3 whitespace-nowrap text-sm sm:text-base">{{ country.ranking }}</td>
    <td class="p-3">
      <RouterLink
        class="no-underline decoration-[#2c3e50]"
        :to="{ name: 'country-detail-view', params: { id: country.id } }"
      >
        <div class="flex items-center">
          <img
            :src="country.flagUrl"
            :alt="country.name"
            class="w-6 h-4 sm:w-8 sm:h-6 mr-2 object-cover"
          />
          <span class="break-words text-sm sm:text-base">{{ country.name }}</span>
        </div>
      </RouterLink>
    </td>
    <td class="p-3 text-center text-sm sm:text-base">{{ country.gold }}</td>
    <td class="p-3 text-center text-sm sm:text-base">{{ country.silver }}</td>
    <td class="p-3 text-center text-sm sm:text-base">{{ country.bronze }}</td>
    <td class="p-3 text-center text-sm sm:text-base">{{ country.totalMedals }}</td>
  </tr>
</template>

<style scoped></style>

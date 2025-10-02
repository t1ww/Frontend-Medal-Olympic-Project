<script setup lang="ts">
import { type Country } from '@/types'
defineProps<{
  coutry: Country
}>()
</script>

<template>
  
  <tr class="border-b border-separate">
    <!-- Sport Column -->
    <td class="text-center p-3">{{ coutry.countrySports.sportName }}</td>
    <!-- Gold Column -->
    <td class="text-center p-3">{{ coutry.countrySports.gold }}</td>
    <!-- Silver Column -->
    <td class="text-center p-3">{{ coutry.countrySports.silver }}</td>
    <!-- Bronze Column -->
    <td class="text-center p-3">{{ coutry.countrySports.bronze }}</td>
  </tr>
  
</template>

<style scoped>
</style>

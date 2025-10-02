<script setup lang="ts">
import { defineProps, computed } from 'vue';

// Define props and set defaults to prevent errors
const props = defineProps({
  label: String,
  options: {
    type: Array,
    required: true,
  },
  existingSports: {
    type: Array,
    default: () => [], // Ensure it's always an array
  },
});

// Computed property to disable only already-added sports
const computedOptions = computed(() =>
  props.options.map((option) => ({
    ...option,
    disabled: props.existingSports.includes(option.id), // Correct disabling logic
  }))
);
</script>

<template>
  <div class="m-2">
    <label v-if="label">{{ label }}</label>
  </div>
  <select class="mb-5" v-bind="$attrs" v-model="$attrs.modelValue" >
    <option
      v-for="option in computedOptions"
      :key="option.id"
      :value="option.id"
      :disabled="option.disabled"
    >
      {{ option.sportName }}
    </option>
  </select>
</template>




<style scoped>
select {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  color: black;
}
</style>


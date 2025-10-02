<script setup lang="ts">
const modelValue = defineModel()
interface BaseInputProps {
    label: string
}
const props = withDefaults(defineProps<BaseInputProps>(), {
    label: ''
})
</script>
<template>
    <label v-if="label">
        
    </label>
    <input class="border text-black border-gray-600" v-bind="$attrs" v-model="modelValue" :placeholder="label"/>
</template>
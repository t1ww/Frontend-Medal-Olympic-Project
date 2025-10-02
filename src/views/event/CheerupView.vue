  <script setup lang="ts">
import { ref, toRefs, defineProps } from 'vue'
import { type Country } from '@/types'
import { useRouter } from 'vue-router';
import { cheerupStore } from '@/stores/cheerup'

const props = defineProps<{
  country: Country
  id: String
}>()
const { country } = toRefs(props)

const router = useRouter()
const store = cheerupStore()
const cheerUp = ref('')
const name = ref('')

function submitCheerup() {
  if (cheerUp.value.trim() !== '') {
    store.addCheerup(props.country.id, cheerUp.value, name.value) // store the message
    name.value = '' // clear the input field
    cheerUp.value = '' // clear the input field
    router.push({ name: 'country-detail-view', params: { id: props.country.id } }) // redirect to the detail page
  }
}
</script>

<template>
  <div class="max-w-md mx-auto p-4">
    <div class="flex flex-col font-sans antialias">
      <h2 class="text-xl font-bold mb-4">Write something nice to cheer up team {{ country.name }}!!</h2>

      <label for="nameInput" class="mb-2">Your Name:</label>
      <input id="nameInput" v-model="name" type="text" placeholder="Type your name here" class="text-[#252A34] mb-4 p-2 border rounded focus:ring-2 focus:ring-[#08D9D6]">

      <label for="cheerUpMessage" class="mb-2">Message:</label>
      <textarea id="cheerUpMessage" v-model="cheerUp" rows="4" placeholder="Type your message here" class="text-[#252A34] mb-4 p-2 border rounded focus:ring-2 focus:ring-[#08D9D6]"></textarea>

      <button 
        class="bg-[#08D9D6] text-[#252A34] font-bold py-2 px-4 rounded hover:bg-[#06A8A5] transition duration-300"
        @click="submitCheerup">
        Submit
      </button>
    </div>
  </div>
</template>
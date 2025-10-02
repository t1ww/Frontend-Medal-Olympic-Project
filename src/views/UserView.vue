<script setup lang="ts">
import { ref } from 'vue'
//import { useUserStore } from '@/stores/user' // Assuming you have a user store

const userStore = useUserStore()
const newPassword = ref('')
const confirmPassword = ref('')
const errorMessage = ref('')

const changePassword = () => {
  if (newPassword.value !== confirmPassword.value) {
    errorMessage.value = 'Passwords do not match'
    return
  }
  
  // Here you would typically call an API to update the password
  // For now, we'll just update it in the store
  userStore.updatePassword(newPassword.value)
  newPassword.value = ''
  confirmPassword.value = ''
  errorMessage.value = 'Password updated successfully'
}
</script>

<template>
  <div class="container mx-auto p-4">
    <div class="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
      <div class="md:flex">
        <div class="md:flex-shrink-0">
          <img class="h-48 w-full object-cover md:w-48" :src="userStore.user.profilePicture" alt="User profile picture">
        </div>
        <div class="p-8">
          <div class="uppercase tracking-wide text-sm text-indigo-500 font-semibold">User Profile</div>
          <p class="block mt-1 text-lg leading-tight font-medium text-black">{{ userStore.user.name }}</p>
          <p class="mt-2 text-gray-500">Username: {{ userStore.user.username }}</p>
          
          <div class="mt-4">
            <h3 class="text-lg font-medium">Change Password</h3>
            <input v-model="newPassword" type="password" placeholder="New Password" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
            <input v-model="confirmPassword" type="password" placeholder="Confirm New Password" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
            <button @click="changePassword" class="mt-2 px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600">Save Changes</button>
            <p v-if="errorMessage" class="mt-2 text-red-500">{{ errorMessage }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

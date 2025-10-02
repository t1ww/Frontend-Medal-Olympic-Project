<script setup lang="ts">
import { computed, ref } from 'vue';
import * as yup from 'yup'
import { useAuthStore } from '@/stores/auth'
import { useField, useForm } from 'vee-validate'
import { useMessageStore } from '@/stores/message'
const messageStore = useMessageStore()

import { useRouter } from 'vue-router'
const router = useRouter()
const isLogin = ref(true);
const { value: email } = useField('email')
const { value: username } = useField('username')
const { value: password } = useField('password')
const { value: confirmPassword } = useField('confirmPassword')

const authStore = useAuthStore()
const validationSchema = computed(() => {
  if (isLogin.value) {
    // Login: only username & password required
    return yup.object({
      username: yup.string().required('Username is required'),
      password: yup.string().required('Password is required')
    })
  } else {
    // Registration
    return yup.object({
      email: yup.string().required('Email is required').email('Invalid email'),
      username: yup.string().required('Username is required'),
      password: yup.string().required('Password is required'),
      confirmPassword: yup.string()
        .oneOf([yup.ref('password')], 'Passwords must match')
        .required('Confirm password is required')
    })
  }
})

const { errors, handleSubmit } = useForm({
  validationSchema,
  initialValues: {
    email: '',
    username: '',
    password: '',
    confirmPassword: ''
  }
})

const onSubmit = handleSubmit((values) => {
  authStore.login(values.email, values.password)
    .then(() => {
      router.push({ name: 'event-list-view' })
    }).catch((err) => {
      messageStore.updateMessage('could not login')
      setTimeout(() => {
        messageStore.resetMessage()
      }, 3000)
    })
})

// Toggle between Login and Registration
const toggleLogin = () => {
  isLogin.value = !isLogin.value;
  resetFields(); // Reset the form fields on toggle
};


// Reset form fields
const resetFields = () => {
  email.value = '';
  username.value = '';
  password.value = '';
  confirmPassword.value = '';
};
</script>
<template>
  <div class="min-h-screen bg-[#252A34] flex items-center justify-center">
    <div class="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
      <h2 class="text-2xl font-bold text-center mb-4 text-[#08D9D6]">
        {{ isLogin ? 'Welcome Back!' : 'Create Your Account' }}
      </h2>
      <p class="text-center text-black mb-12 ">
        {{ isLogin ? 'Enter your credentials to log in.' : 'Enter your details to register an account.' }}
      </p>

      <!-- Registration/Login Form -->
      <form @submit.prevent="onSubmit">
        <div class="space-y-4">

          <!-- Email/Phone Number Field for Registration Only -->
          <div v-if="!isLogin" class="form-group">
            <label for="email" class="block text-sm text-start font-medium mb-2 text-gray-700">
              Email
            </label>
            <input type="text" id="email" v-model="email" :error="errors['email']" required
              class="w-full border text-black border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-[#08D9D6]"
              placeholder="Enter Email" />
          </div>

          <!-- Username Field -->
          <div class="form-group">
            <label for="username" class="block text-sm text-start font-medium mb-2 text-gray-700">
              Username
            </label>
            <input type="text" id="username" v-model="username" required
              class="w-full border text-black border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-[#08D9D6]"
              placeholder="Enter your username" />
          </div>

          <!-- Password Field -->
          <div class="form-group">
            <label for="password" class="block text-sm text-start font-medium mb-2 text-gray-700">
              Password
            </label>
            <input type="password" id="password" v-model="password" :error="errors['password']" required
              class="w-full border text-black border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-[#08D9D6]"
              placeholder="Enter your password" />
          </div>

          <!-- Confirm Password Field for Registration Only -->
          <div v-if="!isLogin" class="form-group">
            <label for="confirm-password" class="block text-sm text-start font-medium mb-2 text-gray-700">
              Confirm Password
            </label>
            <input type="password" id="confirm-password" v-model="confirmPassword" :error="errors['password']" required
              class="w-full border text-black border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-[#08D9D6]"
              placeholder="Confirm your password" />
          </div>
        </div>

        <!-- Submit Button -->
        <div class="mt-12 space-y-2">
          <button type="submit"
            class="w-full bg-[#FF2E63] text-white font-semibold py-2 rounded-md hover:bg-[#FF4B7E] transition">
            {{ isLogin ? 'Log In' : 'Register' }}
          </button>

          <!-- Toggle Between Login and Registration -->
          <div class="text-center text-sm mt-4 ">
            <p class="text-gray-400">
              {{ isLogin ? "Don't have an account?" : 'Already have an account?' }}
              <button @click="toggleLogin" class="text-[#FF4B7E] hover:underline font-medium ml-1">
                {{ isLogin ? 'Sign Up' : 'Log In' }}
              </button>
            </p>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>
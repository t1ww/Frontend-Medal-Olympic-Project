import { defineStore } from 'pinia';
import axios from 'axios';
import type { AxiosInstance } from 'axios';
import { type Organizer } from '@/types';

const apiClient: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL,
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});
export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: null as string | null,
    user: null as Organizer | null
  }),
  getters: {
    currentUserName(): string {
      return this.user?.name || ''
    }
  },
  actions: {
    login(username: string, password: string) {
      return apiClient
        .post('/api/v1/auth/authenticate', {
          username: username,
          password: password,
        })
        .then((response) => {
          this.token = response.data.accessToken;
          this.user = response.data.user;
          localStorage.setItem('access_token', this.token as string)
          localStorage.setItem('user', JSON.stringify(this.user))
          return response;
        })
    }
  }
})
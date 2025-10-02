import axios from 'axios'
const apiclient = axios.create({
    baseURL: import.meta.env.VITE_APP_API_URL,
    withCredentials: false,

    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    }
})
export default apiclient
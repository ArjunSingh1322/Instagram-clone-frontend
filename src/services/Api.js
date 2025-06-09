

import axios from "axios";

 let api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    headers:{
        "content-type" : "application/json"
        
    }
})


api.interceptors.request.use((config) => {
  const token = localStorage.getItem('userToken')
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`
  }
  return config
})


export default api


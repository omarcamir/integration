import axios from "axios";

export const axiosInstance = axios.create({
    
    baseURL: 'http://localhost:3000',
    headers: {
        'Content-Type' : 'application/json'
    }
}) 

// import axios from 'axios'
// import LocalStorageService from './services/storage/localstorageservice'
// import router from './router/router'

// // LocalStorageService
// const localStorageService = LocalStorageService.getService()

// // Add a request interceptor
// axios.interceptors.request.use(
//   config => {
//     const token = localStorageService.getAccessToken()
//     if (token) {
//       config.headers['Authorization'] = 'Bearer ' + token
//     }
//     // config.headers['Content-Type'] = 'application/json';
//     return config
//   },
//   error => {
//     Promise.reject(error)
//   }
// )
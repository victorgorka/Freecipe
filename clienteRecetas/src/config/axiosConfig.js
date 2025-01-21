import axios from 'axios';

// Create an Axios instance
const axiosInstance = axios.create({
    baseURL: 'http://localhost:8080/', // Backend base URL
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token'); // Get token from local storage
        if (token) {
            config.headers.Authorization = `Bearer ${token}`; // Attach token to headers
        }
        return config;
    },
    (error) => {
        return Promise.reject(error); // Handle request errors
    }
);

// Add a response interceptor (optional)
axiosInstance.interceptors.response.use(
    (response) => {
        return response; // Handle successful responses
    },
    (error) => {
        if (error.response && error.response.status === 401) {
            console.error('Unauthorized: Please login again');
            localStorage.removeItem('token'); // Remove invalid token
            window.location.href = '/login'; // Redirect to login
        }
        return Promise.reject(error); // Handle other response errors
    }
);

export default axiosInstance;

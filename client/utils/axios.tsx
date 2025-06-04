import axios, { AxiosInstance } from "axios";


const baseURL: string = "http://localhost:8000/api"

const axiosInstance: AxiosInstance = axios.create({
    baseURL: baseURL,
    headers: {
        "Content-Type": "application/json",
    },
});

axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("accessToken");
        if (token && config.headers) {
            config.headers.Authorization = `JWT ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        // If token expired and refresh token logic is available
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const refreshToken = localStorage.getItem("refreshToken");
                const { data } = await axios.post(`${baseURL}/auth/refresh`, {
                    refresh: refreshToken,
                });

                localStorage.setItem("accessToken", data.access);

                originalRequest.headers.Authorization = `JWT ${data.access}`;

                return axiosInstance(originalRequest);
            } catch (refreshError) {
                window.location.href = '/auth/login'
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

export { axiosInstance, baseURL };

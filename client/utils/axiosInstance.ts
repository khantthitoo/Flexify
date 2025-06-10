import axios, { AxiosInstance, AxiosError } from "axios";

const axiosInstance: AxiosInstance = axios.create({
    baseURL: "http://localhost:8000/api",
    headers: {
        "Content-Type": "application/json",
    },
});

const getAccessToken = () => {
    if (typeof window !== "undefined") {
        return localStorage.getItem("accessToken");
    }
    return null;
};

const getRefreshToken = () => {
    if (typeof window !== "undefined") {
        return localStorage.getItem("refreshToken");
    }
    return null;
};


axiosInstance.interceptors.request.use(
    (config) => {
        const token = getAccessToken();
        if (token && config.headers) {
            config.headers.Authorization = `JWT ${token}`;
        }
        return config;
    },
    (err) => console.error(err)
);

axiosInstance.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
        const originalRequest = error.config as any;

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const response = await axios.post(`http://localhost:8000/api/auth/jwt/refresh/`, {
                    refresh: getRefreshToken(),
                });

                localStorage.setItem('accessToken', response.data.access);
                originalRequest.headers.Authorization = `JWT ${response.data.access}`;
                return axiosInstance(originalRequest);
            } catch (error: any) {
                localStorage.removeItem('accessToken');
                localStorage.removeItem('refreshToken');
                window.location.href = "/login";
                return Promise.reject(error);
            }
        }

        return Promise.reject(error)
    }
)

export default axiosInstance
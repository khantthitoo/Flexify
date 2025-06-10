"use client";
import axiosInstance from "../../utils/axiosInstance";
import { AxiosError } from "axios";
import {
    createContext,
    Dispatch,
    ReactNode,
    SetStateAction,
    useContext,
} from "react";

interface AuthContextType {
    login: (
        username: string,
        password: string,
        setLoading: Dispatch<SetStateAction<boolean>>
    ) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const login = async (
        username: string,
        password: string,
        setLoading: Dispatch<SetStateAction<boolean>>
    ): Promise<boolean> => {
        setLoading(true);
        try {
            const response = await axiosInstance.post("/auth/jwt/create/", {
                username: username,
                password: password,
            });

            localStorage.setItem("accessToken", response.data.access);
            localStorage.setItem("refreshToken", response.data.refresh);

            return true;
        } catch (error: any) {
            alert(error.response.data.detail);
            return false;
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthContext.Provider value={{ login }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};

import React, { createContext, useContext, type Dispatch, type SetStateAction } from "react";
import { axiosInstance } from "../../utils/axios";

interface loginProps {
    username: string;
    password: string;
    setLoading: Dispatch<SetStateAction<boolean>>;
}

interface AuthContextType {
    login: ({ username, password, setLoading }: loginProps) => Promise<boolean>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const login = async ({
        username,
        password,
        setLoading,
    }: loginProps): Promise<boolean> => {
        setLoading(true);
        try {
            const { data } = await axiosInstance.post("/auth/jwt/create/", {
                username: username,
                password: password,
            });

            localStorage.setItem("accessToken", data.access);
            localStorage.setItem("refreshToken", data.refresh);

            return true;
        } catch (err: any) {
            alert(err.response.data.detail);
            return false;
        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
    }

    return (
        <AuthContext.Provider value={{ login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context)
        throw new Error("useAuth must be used within an AuthProvider");
    return context;
};

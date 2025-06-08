import React, { useState } from "react";
import { ClipLoader } from "react-spinners";
import { useNavigate } from "react-router";
import { useAuth } from "../contexts/AuthContext";

const AuthForm = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const { login } = useAuth();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        if (await login({username, password, setLoading})) {
            navigate('/dashboard');
        }
    };

    return (
        <form
            className="w-full flex flex-col gap-9 mt-10"
            onSubmit={handleLogin}
        >
            {/* Username Input */}
            <div className="w-4/5 mx-auto relative">
                <span className="absolute -translate-y-3.5 px-2 ml-4 z-10 bg-[var(--secondary)] text-lg font-medium text-[var(--primary)]">
                    Username
                </span>
                <input
                    type="text"
                    className="w-full h-12 border-2 rounded-lg outline-none border-[var(--primary)] text-[var(--primary)] px-2 bg-[var(--secondary)]"
                    onChange={(e) => setUsername(e.target.value)}
                />
            </div>
            {/* End Username Input */}

            {/* Password Input */}
            <div className="w-4/5 mx-auto relative">
                <span className="absolute -translate-y-3.5 px-2 ml-4 z-10 bg-[var(--secondary)] text-lg font-medium text-[var(--primary)]">
                    Password
                </span>
                <input
                    type="password"
                    className="w-full h-12 border-2 rounded-lg outline-none border-[var(--primary)] text-[var(--primary)] px-2 bg-[var(--secondary)]"
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            {/* End Password Input */}

            {/* Submit Btn */}
            <button className="w-4/5 mx-auto h-12 rounded-lg bg-[var(--primary)] text-xl font-medium cursor-pointer hover:opacity-80">
                {loading ? (
                    <ClipLoader
                        loading={true}
                        color="black"
                        className="mt-1"
                        size={25}
                    />
                ) : (
                    "Login"
                )}
            </button>
            {/* End Submit Btn */}
        </form>
    );
};

export default AuthForm;

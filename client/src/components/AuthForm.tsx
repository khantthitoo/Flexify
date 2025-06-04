import React from "react";

interface AuthFormProps {
    action: string;
}

const AuthForm: React.FC<AuthFormProps> = ({ action }) => {
    return (
        <form className="w-full flex flex-col gap-9 mt-10">
            {/* Username Input */}
            <div className="w-4/5 mx-auto relative">
                <span className="absolute -translate-y-3.5 px-2 ml-4 z-10 bg-[var(--secondary)] text-lg font-medium text-[var(--primary)]">
                    Username
                </span>
                <input
                    type="text"
                    className="w-full h-12 border-2 rounded-lg outline-none border-[var(--primary)] text-[var(--primary)] px-2 bg-[var(--secondary)]"
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
                />
            </div>
            {/* End Password Input */}

            {/* Submit Btn */}
            <button className="w-4/5 mx-auto h-12 rounded-lg bg-[var(--primary)] text-xl font-medium cursor-pointer hover:opacity-80">
                {action === "login" ? "Login" : "Register"}
            </button>
            {/* End Submit Btn */}
        </form>
    );
};

export default AuthForm;

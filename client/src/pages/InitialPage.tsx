import { useEffect } from "react";
import { useNavigate } from "react-router";

const InitialPage = () => {
    const navigate = useNavigate(); // to navigate

    useEffect(() => {
        setTimeout(() => {
            if (!localStorage.getItem("refreshToken")) {
                navigate("/auth/login");
            } else {
                navigate("/dashboard");
            }
        }, 2000);
    });

    return (
        <div className="bg-[var(--secondary)] w-screen h-screen flex justify-center items-center">
            <h1 className="text-[var(--primary)] text-7xl italic font-extrabold">
                FLEXIFY
            </h1>
        </div>
    );
};

export default InitialPage;

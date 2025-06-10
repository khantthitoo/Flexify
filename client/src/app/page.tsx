"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Home = () => {
    const router = useRouter();

    useEffect(() => {
        setTimeout(() => {
            if (!localStorage.getItem('refreshToken')) {
                router.replace('/login');
                return;
            }
            router.replace('/dashboard');
        }, 2000);
    }, [])

    return (
        <main className="w-screen h-screen flex justify-center items-center">
            <h1 className="text-6xl font-extrabold italic">FLEXIFY</h1>
        </main>
    )
}

export default Home;
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, Navigate, RouterProvider } from "react-router";
import "./index.css";
import InitialPage from "./pages/InitialPage";
import AuthLayout from "./layouts/AuthLayout";
import LoginPage from "./pages/auth/LoginPage";

const router = createBrowserRouter([
    {
        path: '/',
        element: <InitialPage />
    },
    {
        path: '/auth',
        element: <AuthLayout />,
        children: [
            {
                index: true,
                element: <Navigate to={'/auth/login'} replace={true} />
            },
            {
                path: 'login',
                element: <LoginPage />
            }
        ]
    }
]);

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <RouterProvider router={router} />
    </StrictMode>
);

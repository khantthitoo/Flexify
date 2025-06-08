import { createRoot } from "react-dom/client";
import { createBrowserRouter, Navigate, RouterProvider } from "react-router";
import "./index.css";
import InitialPage from "./pages/InitialPage";
import AuthLayout from "./layouts/AuthLayout";
import LoginPage from "./pages/auth/LoginPage";
import MainLayout from "./layouts/MainLayout";
import DashboardPage from "./pages/main/DashboardPage";
import { AuthProvider } from "./contexts/AuthContext";
import MembersPage from "./pages/main/MembersPage";

const router = createBrowserRouter([
    {
        index: true,
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
    },
    {
        path: '/dashboard',
        element: <MainLayout />,
        children: [
            {
                index: true,
                element: <DashboardPage />
            },
            {
                path: "members",
                element: <MembersPage />
            }
        ]
    }
]);

createRoot(document.getElementById("root")!).render(
    <AuthProvider>
        <RouterProvider router={router} />
    </AuthProvider>
);

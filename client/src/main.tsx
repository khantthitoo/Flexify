import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";
import "./index.css";
import InitialPage from "./pages/InitialPage";
import AuthLayout from "./layouts/AuthLayout";

const router = createBrowserRouter([
    {
        path: '/',
        element: <InitialPage />
    },
    {
        path: '/auth',
        element: <AuthLayout />
    }
]);

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <RouterProvider router={router} />
    </StrictMode>
);

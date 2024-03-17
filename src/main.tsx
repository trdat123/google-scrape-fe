import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ThemeProvider } from "./components/ui/theme-provider.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import KeywordTable from "./components/KeywordTable.tsx";
import InputFile from "./components/InputFile.tsx";
import KeywordSetCard from "./components/KeywordSetCard.tsx";
import { Auth0Provider } from "@auth0/auth0-react";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/",
                element: <InputFile />,
            },
            {
                path: "history",
                element: <KeywordSetCard />,
            },
            {
                path: "result",
                element: <KeywordTable />,
            },
        ],
    },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <Auth0Provider
            domain={import.meta.env.VITE_ISSUER_BASE_URL!}
            clientId={import.meta.env.VITE_CLIENT_ID!}
            authorizationParams={{
                redirect_uri: window.location.origin,
            }}
            useRefreshTokens
            cacheLocation="localstorage"
        >
            <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
                <RouterProvider router={router} />
            </ThemeProvider>
        </Auth0Provider>
    </React.StrictMode>
);

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ThemeProvider } from "./components/theme-provider.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import KeywordTable from "./KeywordTable.tsx";
import InputFile from "./InputFile.tsx";
import KeywordSetCard from "./KeywordSetCard.tsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "home",
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
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <RouterProvider router={router} />
        </ThemeProvider>
    </React.StrictMode>
);

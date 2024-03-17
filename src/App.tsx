import "./App.css";
import TopNav from "./components/TopNav";
import { Outlet } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "./components/ui/button";
import Center from "./components/Center";
import Loading from "./components/Spinner";
import { Toaster } from "./components/ui/toaster";

function App() {
    const { isLoading, isAuthenticated, error, loginWithRedirect } = useAuth0();

    if (isLoading) {
        return (
            <Center>
                <Loading />
            </Center>
        );
    }
    if (error) {
        alert(error);
        return <></>;
    }

    if (isAuthenticated) {
        return (
            <>
                <TopNav />
                <Outlet />
                <Toaster />
            </>
        );
    } else {
        return (
            <Center>
                <Button onClick={() => loginWithRedirect()} className="text-lg">
                    Log in
                </Button>
            </Center>
        );
    }
}

export default App;

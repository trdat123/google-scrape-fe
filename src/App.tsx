import "./App.css";
import TopNav from "./TopNav";
import { Outlet } from "react-router-dom";

function App() {
    return (
        <>
            <TopNav />
            <Outlet />
        </>
    );
}

export default App;

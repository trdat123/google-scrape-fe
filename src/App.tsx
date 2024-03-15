import { useState } from "react";
import "./App.css";
import TopNav from "./TopNav";
import InputFile from "./InputFile";
import { Table } from "./components/ui/table";

function App() {
    const [count, setCount] = useState(0);

    return (
        <>
            <TopNav />
            <div className="h-[calc(100vh-130px)] flex items-center justify-center">
                <div className="grid w-full max-w-sm items-center gap-1.5">
                    <InputFile />
                    <Table />
                </div>
            </div>
        </>
    );
}

export default App;

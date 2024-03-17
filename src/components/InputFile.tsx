import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import apiCall from "../functions/apiCall";
import Loading from "./Spinner";
import { useToast } from "./ui/use-toast";

const InputFile = () => {
    const [file, setFile] = useState<FileList | null>(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { toast } = useToast();

    const addKeywordSet = useCallback(
        async (fileInput: FileList | null) => {
            setLoading(true);
            const file = fileInput![0];
            const keywords: string[] = [];

            if (!file) {
                console.error("Please select a CSV file");
                alert("Please select a CSV file");
                setLoading(false);
                return;
            }

            if (!/\.csv$/.test(file.name)) {
                console.error("Please select a valid CSV file");
                alert("Please select a valid CSV file");
                setLoading(false);
                return;
            }

            try {
                const fileContents: any = await readUploadedFileAsText(file);
                const fileContentsArray: string[] = fileContents.split("\n");
                fileContentsArray.forEach((keyword) => {
                    if (!keyword || keyword.trim().length === 0) return;
                    keywords.push(keyword);
                });
            } catch (e) {
                console.error(e);
                alert(e);
                setLoading(false);
            }

            const response = await apiCall("POST", "api/addKeywordSet", null, JSON.stringify(keywords));

            const data = await response?.json();

            setLoading(true);
            navigate("/result", { state: data });
            toast({
                title: "Scrape completed",
                description: `Total: ${data.length} keywords`,
            });
        },
        [file]
    );

    return (
        <div className="z-10 w-full h-[calc(100vh-130px)] flex items-center justify-center">
            {loading ? <Loading /> : <Dropzone setFile={setFile} addKeywordSet={addKeywordSet} />}
        </div>
    );
};

const Dropzone = ({
    setFile,
    addKeywordSet,
}: {
    setFile: React.Dispatch<React.SetStateAction<FileList | null>>;
    addKeywordSet: (fileInput: FileList | null) => Promise<void>;
}) => {
    return (
        <div className="grid w-full max-w-sm items-center gap-1.5">
            <div className="flex items-center justify-center w-full">
                <label
                    htmlFor="dropzone-file"
                    className="flex flex-col items-center justify-center w-full h-96 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg--1000 dark:bg-gray-950 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500"
                >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <svg
                            className="w-10 h-10 mb-3 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                            ></path>
                        </svg>
                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                            <span className="font-semibold">Click to upload</span>
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                            SVG, PNG, JPG or GIF (MAX. 800x400px)
                        </p>
                    </div>
                    <input
                        id="dropzone-file"
                        onChange={(e) => {
                            setFile(e.target.files);
                            addKeywordSet(e.target.files);
                        }}
                        type="file"
                        name="file"
                        className="hidden"
                    />
                </label>
            </div>
        </div>
    );
};

const readUploadedFileAsText = (inputFile: any) => {
    const temporaryFileReader = new FileReader();

    return new Promise((resolve, reject) => {
        temporaryFileReader.onerror = () => {
            temporaryFileReader.abort();
            reject(new DOMException("Problem parsing input file."));
        };

        temporaryFileReader.onload = () => {
            resolve(temporaryFileReader.result);
        };
        temporaryFileReader.readAsText(inputFile);
    });
};

export default InputFile;

import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import apiCall from "./functions/apiCall";

const InputFile = () => {
    const [file, setFile] = useState<FileList | null>(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

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
        },
        [file]
    );

    return (
        <div className="z-10 w-full h-[calc(100vh-130px)] flex items-center justify-center">
            {loading ? (
                <div role="status">
                    <svg
                        aria-hidden="true"
                        className="w-20 h-20 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                        viewBox="0 0 100 101"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                            fill="currentColor"
                        />
                        <path
                            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                            fill="currentFill"
                        />
                    </svg>
                    <span className="sr-only">Loading...</span>
                </div>
            ) : (
                <div className="grid w-full max-w-sm items-center gap-1.5">
                    <div className="flex items-center justify-center w-full">
                        <label
                            // for="dropzone-file"
                            className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg--1000 dark:bg-gray-950 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500"
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
                                    <span className="font-semibold">Click to upload</span> or drag and drop
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
            )}
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

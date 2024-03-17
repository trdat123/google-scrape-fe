import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useLocation } from "react-router-dom";
import { IKeyword } from "../types/IKeyword";
import apiCall from "../functions/apiCall";

const KeywordTable = () => {
    const location = useLocation();
    const keywordsData: IKeyword[] = location.state;

    return (
        <div className="min-h-[calc(100vh-130px)] w-full flex items-center justify-center">
            <Table className="w-2/3">
                <TableCaption>A list of keywords searched on Google.</TableCaption>
                <TableHeader className="sticky top-0 bg-black">
                    <TableRow>
                        <TableHead className="text-center">Keyword</TableHead>
                        <TableHead className="text-center">Result Statistic</TableHead>
                        <TableHead className="text-center">Total Ad Words</TableHead>
                        <TableHead className="text-center">Total Links</TableHead>
                        <TableHead className="text-right">HTML String</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody className="overflow-auto">
                    {keywordsData.map((keyword) => (
                        <TableRow key={keyword.id}>
                            <TableCell className="font-medium">{keyword.keyword}</TableCell>
                            <TableCell>{keyword.resultStats}</TableCell>
                            <TableCell>{keyword.totalAdWords}</TableCell>
                            <TableCell>{keyword.totalLinks}</TableCell>
                            <TableCell
                                onClick={() => handleViewHtml(keyword.id)}
                                className="text-right hover:underline cursor-pointer"
                            >
                                ${keyword.htmlString}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

const handleViewHtml = async (keywordId: number) => {
    const response = await apiCall("GET", "api/getHtmlString", { keywordId: keywordId.toString() });

    const encodedHtmlString = await response!.text();
    const htmlString = decodeURIComponent(encodedHtmlString);

    const win = window.open("about:blank", "_blank");
    win?.document.write(htmlString);
    win?.focus();
};

export default KeywordTable;

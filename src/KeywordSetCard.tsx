import { useCallback, useEffect, useState } from "react";
import { Badge } from "./components/ui/badge";
import { useNavigate } from "react-router-dom";
import apiCall from "./functions/apiCall";
import formatDate from "./functions/formatDate";

const KeywordSetCard = () => {
    const [keywordSets, setKeywordSets] = useState<[]>();
    const navigate = useNavigate();

    useEffect(() => {
        getKeywordSets();
    }, []);

    const getKeywordSets = useCallback(async () => {
        const response = await apiCall("GET", "api/getKeywordSets", { userId: 2 });
        setKeywordSets(await response?.json());
    }, [keywordSets]);

    const getKeywordTable = useCallback(
        async (setId: number) => {
            const response = await apiCall("GET", "api/getKeywordSingleSet", { setId });

            const keywordSetData = await response?.json();
            navigate("/result", { state: keywordSetData });
        },
        [keywordSets]
    );

    return (
        <div className="flex flex-col gap-2 p-4 pt-0">
            {keywordSets?.map((item: any) => (
                <div
                    key={item.keywordSet}
                    className="flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all cursor-pointer hover:bg-accent"
                    onClick={() => getKeywordTable(item.keywordSet)}
                >
                    <div className="flex w-full flex-col gap-1">
                        <div className="flex items-center">
                            <div className="flex items-center gap-2">
                                <div className="font-semibold">
                                    {item.userName} - {item.userEmail}
                                </div>
                                {!item.read && <span className="flex h-2 w-2 rounded-full bg-blue-600" />}
                            </div>
                            <div className="ml-auto text-xs">{formatDate(item.createdAt)}</div>
                        </div>
                        <div className="text-xs font-medium">Set ID: {item.keywordSet}</div>
                    </div>
                    <div className="line-clamp-2 text-xs text-muted-foreground">
                        Total of words: {item.totalKeywords}
                    </div>
                    {item.keywords.length ? (
                        <div className="flex items-center w-full gap-2 overflow-x-auto">
                            {item.keywords.map((keyword: string) => (
                                <Badge key={keyword} variant="secondary" className="my-2">
                                    <p className="truncate overflow-hidden">{keyword}</p>
                                </Badge>
                            ))}
                        </div>
                    ) : null}
                </div>
            ))}
        </div>
    );
};

export default KeywordSetCard;

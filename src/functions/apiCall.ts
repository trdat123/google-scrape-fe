type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

const apiCall = async (method: HttpMethod, endpoint: string, params: {} | null, body?: BodyInit | null) => {
    let url = `http://localhost:8000/${endpoint}`;
    if (params) url += "?" + new URLSearchParams(params);

    const response = await fetch(url, {
        method: method,
        headers: {
            "Content-type": "application/json",
        },
        body: body,
    });

    if (!response.ok) {
        console.error("Error:", response.status);
        return;
    }

    return response;
};

export default apiCall;

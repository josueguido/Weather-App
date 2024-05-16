import { useState, useEffect } from "react";
import axios from "axios";

export function useFetch(url, endpoint, params) {

    const [data, setData] = useState(null)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(true)
    const [controller, setController] = useState(null)

    useEffect(() => {
        const abortController = new AbortController();
        setController(abortController);

        const fetchData = async () => {
            const options = {
                method: 'GET',
                url: `https://weatherapi-com.p.rapidapi.com/${endpoint}`,
                params: params,
                headers: {
                    'X-RapidAPI-Key': '59c4bf489dmsh068ed231235424ap1695cfjsna2971bd258c2',
                    'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
                }
            };
            try {
                setLoading(true);
                const response = await axios.request(options);
                setData(response.data);
            } catch (error) {
                if (error.name === "AbortError") {
                    console.log("Cancelled request");
                } else {
                    setError(error);
                }
            } finally {
                setLoading(false);
            }
        };

        fetchData();

        return () => abortController.abort();
    }, [endpoint, params]);

    const handleCancelRequest = () => {
        if (controller) {
            controller.abort();
            setError("Cancelled Request");
        }
    };

    return { data, error, loading, handleCancelRequest };
}



import { useState, useEffect } from "react";

const useFetchData = (endpoint, labelCallback) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const apiResponse = await fetch(`${process.env.NEXT_PUBLIC_WEBSITE_URL}/${endpoint}/all`);

                if (!apiResponse.ok) {
                    throw new Error(`API Error: ${apiResponse.statusText}`);
                }

                const result = await apiResponse.json();
                const fetchedData = Array.isArray(result?.data) ? result?.data : [];

                const formattedData = fetchedData.map((item) => ({
                    label: labelCallback(item), // Custom label formatting
                    key: item.id,
                    id: item.id
                }));

                setData(formattedData);
            } catch (error) {
                console.error(`Error fetching ${endpoint}:`, error.message);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [endpoint, labelCallback]);

    return { data, loading, error };
};

export default useFetchData;
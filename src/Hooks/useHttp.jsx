import { useCallback, useEffect, useState } from "react";

async function sendHttpRequest(url, config) {
    const response = await fetch(url, config)
    const resDeta = await response.json()
    if (!response.ok) {
        throw new Error(resDeta.Error || 'Something went Wrong!')
    }

    return resDeta;
}

const useHttp = (url, config, initialData) => {
    const [data, setData] = useState(initialData)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState()

    const sentRequest = useCallback(
        async function sentRequest() {
            setIsLoading(true)

            try {
                const resData = await sendHttpRequest(url, config)
                setData(resData.products)
            } catch (error) {
                setError(error.message || 'Something went wrong!')
            }
            setIsLoading(false)
        }

        , [url, config])


    useEffect(() => {
        if ((config && (config.method === 'GET' || !config.method)) || !config) {
            sentRequest()
        }
    }, [sentRequest, config])

    return {
        data,
        useHttp,
        isLoading, error
    }
}

export default useHttp;
import genreService, {type Genre} from "@/services/genreService.ts";
import {type ApiResponse, CanceledError} from "@/services/apiClient.ts";
import {useEffect, useState} from "react";
import type {AxiosError} from "axios";

const useGenres = () => {
    const [genres, setGenres] = useState<Genre[]>([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const { request, cancel } = genreService.getAll<ApiResponse<Genre>>()

        request
            .then(res => {
                setGenres(res.data.results);
            })
            .catch((err: AxiosError) => {
                if (err instanceof CanceledError)
                    return;
                setError(err.message);
            })

        return (() => cancel())
    }, []);

    return { genres, error, setGenres, setError }
}

export default useGenres;
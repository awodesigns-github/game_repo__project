import {useEffect, useState} from "react";
import gamesService, {type Game} from "@/services/gamesService.ts";
import {type ApiResponse, CanceledError} from "@/services/apiClient.ts";
import type {AxiosError} from "axios";

const useGames = (genre: string) => {
    const [games, setGames] = useState<Game[]>();
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setGames(undefined);
        setError('');
        setIsLoading(true);

        const { request, cancel } = gamesService.getAllByGenre<ApiResponse<Game>>(genre);

        request
            .then(res => {
                setGames(res.data.results);
                setIsLoading(false);
            })
            .catch((err: AxiosError) => {
                if (err instanceof CanceledError)
                    return;
                setError(err.message);
                setIsLoading(false);
            })

        return (() => cancel());
    }, [genre])

    return { games, setGames, error, setError, isLoading, setIsLoading }
}

export default useGames;
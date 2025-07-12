import gamesService, {type Game} from "@/services/gamesService.ts";
import {type ApiResponse} from "@/services/apiClient.ts";
import {useQuery} from "@tanstack/react-query";

const useGames = (genre: string) => {
    const { request } = gamesService.getAllByGenre<ApiResponse<Game>>(genre);

    const fetchGames = async () => {
        return request
            .then(res => res.data)
    }

    return useQuery<ApiResponse<Game>, Error>({
        queryKey: ['games', genre],
        queryFn: fetchGames
    });
}

export default useGames;
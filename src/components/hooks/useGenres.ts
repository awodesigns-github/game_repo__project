import genreService, {type Genre} from "@/services/genreService.ts";
import {type ApiResponse} from "@/services/apiClient.ts";
import {useQuery} from "@tanstack/react-query";

const useGenres = () => {
    const { request } = genreService.getAll<ApiResponse<Genre>>();

    const fetchGenres = async () => {
        return request
            .then(res => res.data)
    }

    return useQuery<ApiResponse<Genre>, Error>({
        queryKey: ['genres'],
        queryFn: fetchGenres
    });
}

export default useGenres;
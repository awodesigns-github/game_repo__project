import createInstance from "@/services/httpService.ts";
import type {Genre} from "@/services/genreService.ts";


export interface Game {
    id: number;
    name: string;
    slug: string;
    background_image: string;
    suggestions_count: string;
    metacritic: number;
    genres: Genre[];
    parent_platforms: {
        platform: {
            id: number;
            name: string;
            slug: string
        }
    }[];
    rating: number;
    rating_top: number;
    released: string;
}

export default createInstance('/games');
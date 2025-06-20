import createInstance from "@/services/httpService.ts";

export interface Genre {
    id: number;
    name: string;
    slug: string;
    games_count: number;
    image_background: string;
}

export default createInstance('/genres');
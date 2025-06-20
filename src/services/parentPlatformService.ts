import createInstance from "@/services/httpService.ts";

export interface Platform {
    id: number;
    name: string;
    slug: string;
    games_count: number;
    year_start: string;
    year_end: string;
}

export interface ParentPlatform {
    id: number;
    name: string;
    slug: string;
    platforms: Platform[];
}

export default createInstance('/platforms/lists/parents');
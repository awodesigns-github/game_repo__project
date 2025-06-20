import apiClient from "@/services/apiClient.ts";

class HttpService {
    public endpoint: string
    apiKey = import.meta.env.VITE_RAWG_API_KEY;

    constructor(endpoint: string) {
        this.endpoint = endpoint;
    }

    getAllByGenre<T>(genre: string) {
        const controller = new AbortController();

        const request = apiClient.get<T>(this.endpoint, {
            signal: controller.signal,
            params: {
                key: this.apiKey,
                genres: genre
            }
        })

        return { request, cancel: () => controller.abort() }
    }

    getAll<T>() {
        const controller = new AbortController();

        const request = apiClient.get<T>(this.endpoint, {
            signal: controller.signal,
            params: {
                key: this.apiKey
            }
        })

        return { request, cancel: () => controller.abort() }
    }
}

export default function createInstance(endPoint: string) {
    return new HttpService(endPoint);
}
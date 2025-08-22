import axios from "axios";
const baseUrl: string = import.meta.env.VITE_BASE_URL;

export interface ApiResponse<T> {
    count: number;
    results: T[];
}

export default axios.create({
    baseURL: baseUrl
})

export { AxiosError, CanceledError } from 'axios';
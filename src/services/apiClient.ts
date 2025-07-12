import axios from "axios";


export interface ApiResponse<T> {
    count: number;
    results: T[];
}

export default axios.create({
    baseURL: 'https://api.rawg.io/api'
})

export { AxiosError, CanceledError } from 'axios';
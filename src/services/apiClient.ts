import axios from "axios";


export interface ApiResponse<T> {
    results: T[]
}

export default axios.create({
    baseURL: 'https://api.rawg.io/api'
})

export { AxiosError, CanceledError } from 'axios';
import {createContext} from "react";

export interface GenreContextType {
    genre: string;
    updateGenre: (genre: string) => void
}

export const GenreContext = createContext<GenreContextType>({
    genre: 'action',
    updateGenre: () => {}
});
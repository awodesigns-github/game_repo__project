import {
    Box,
    SimpleGrid,
    Spinner,
    Text,
    VStack
} from "@chakra-ui/react";
import GameCard from "@/components/GameCard.tsx";
import gamesService, {type Game} from "@/services/gamesService.ts";
import {type ApiResponse, CanceledError} from "@/services/apiClient.ts";
import {useEffect, useState} from "react";
import type {AxiosError} from "axios";

interface GamesGridProps {
    genre: string;
}

const GamesGrid = ({ genre }: GamesGridProps) => {
    const [games, setGames] = useState<Game[]>();
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setGames(undefined);
        setError('');
        setIsLoading(true);

        const { request, cancel } = gamesService.getAllByGenre<ApiResponse<Game>>(genre);

        request
            .then(res => {
                setGames(res.data.results);
                setIsLoading(false);
            })
            .catch((err: AxiosError) => {
                if (err instanceof CanceledError)
                    return;
                setError(err.message);
                setIsLoading(false);
            })

        return (() => cancel());
    }, [genre])

    return (
        <>
            { error && <Text>{error}</Text> }
            {
                isLoading || (games === undefined && !error) ?
                    <Box
                        height={'100vh'}
                        width={'100%'}
                        display={'flex'}
                        justifyContent={'center'}
                        alignItems={'center'}
                    >
                        <VStack>
                            <Spinner size={'lg'} color={'darkcyan'} />
                            <Text>Loading games...</Text>
                        </VStack>
                    </Box>
                    :
                    <SimpleGrid
                        columns={3}
                        gap={4}
                        my={4}
                    >
                        {
                            games?.map((game) => (
                                <GameCard game={game} key={game.id}></GameCard>
                            ))
                        }
                    </SimpleGrid>
            }
        </>
    )
}

export default GamesGrid;
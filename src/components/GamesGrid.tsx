import {
    Box,
    SimpleGrid,
    Spinner,
    Text,
    VStack
} from "@chakra-ui/react";
import GameCard from "@/components/GameCard.tsx";
import useGames from "@/components/hooks/useGames.ts";
import type {Game} from "@/services/gamesService.ts";


interface GamesGridProps {
    genre: string;
    selectValue: string;
}

const GamesGrid = ({ genre, selectValue }: GamesGridProps) => {
    const { games, error, isLoading } = useGames(genre);

    // TODO: Implement a games filter based on the parent platforms in that particular game

    const filteredList = () => {
        const filteredArr: Game[] = [];

        if (selectValue) {
            games?.forEach(game => {
                game.parent_platforms.map(pPlatform => {
                    if (pPlatform.platform.slug === selectValue)
                        filteredArr.push(game);
                })
            });

            return filteredArr;
        }

        return games;
    }


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
                            filteredList()?.map((game) => (
                                <GameCard game={game} key={game.id}></GameCard>
                            ))
                        }
                    </SimpleGrid>
            }
        </>
    )
}

export default GamesGrid;
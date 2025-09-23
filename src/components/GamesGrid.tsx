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
import {useContext} from "react";
import {GenreContext} from "@/context/genreContext.ts";


interface GamesGridProps {
    selectValue: string;
    searchParam?: string;
}

const GamesGrid = ({ selectValue, searchParam }: GamesGridProps) => {
    const { genre } = useContext(GenreContext);
    const { data: games, error, isLoading } = useGames(genre);

    const filteredList = () => {
        const filteredArr: Game[] = [];

        if (selectValue) {
            games?.results.forEach(game => {
                game.parent_platforms.map(pPlatform => {
                    if (pPlatform.platform.slug === selectValue)
                        filteredArr.push(game);
                })
            });

            return filteredArr;
        }

        return games?.results;
    }

    const finalList = () => {
        if (searchParam) {
            const formattedSearchParam = searchParam?.toLowerCase().replace(" ", "-");
            return filteredList()?.filter(game => game.slug.includes(formattedSearchParam));
        }

        return filteredList();
    }


    return (
        <>
            { error && <Text>{error.message}</Text> }
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
                        columns={{
                            base: 1,
                            sm: 2,
                            lg: 3
                        }}
                        paddingBottom={{
                            lg: 40
                        }}
                        gap={4}
                        my={4}
                        mb={10}
                        height={{
                            base: 600,
                            md: 900,
                            lg: 700,
                            xl: 'calc(100vh - 12%)'
                        }}
                        overflowY={'auto'}
                        overflowX={'hidden'}
                    >
                        {
                            finalList()?.map((game) => (
                                <GameCard game={game} key={game.id} />
                            ))
                        }
                        <Box height={'100px'}></Box>
                    </SimpleGrid>
            }
        </>
    )
}

export default GamesGrid;
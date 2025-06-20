import {
    Box,
    SimpleGrid,
    Spinner,
    Text,
    VStack
} from "@chakra-ui/react";
import GameCard from "@/components/GameCard.tsx";
import useGames from "@/components/hooks/useGames.ts";

interface GamesGridProps {
    genre: string;
}

const GamesGrid = ({ genre }: GamesGridProps) => {
    const { games, error, isLoading } = useGames(genre);

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
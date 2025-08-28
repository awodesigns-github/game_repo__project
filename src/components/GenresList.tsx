import {Avatar, Box, For, HStack, LinkBox, Spinner, Stack, Text, VStack} from "@chakra-ui/react";
import {useColorModeValue} from "@/components/ui/color-mode.tsx";
import useGenres from "@/components/hooks/useGenres.ts";
import {LuBox} from "react-icons/lu";

interface GenresListProps {
    onGenreClick: (genreSlug: string, genreTitle: string) => void;
    activeLink: string;
}

const GenresList = ({ onGenreClick, activeLink }: GenresListProps) => {
    const textColor = useColorModeValue('blackAlpha.600', 'whiteAlpha.600');
    const { data: genres, error, isLoading } = useGenres();

    return (
        <>
            { isLoading &&
                <Box
                    height={'100vh'}
                    display={'flex'}
                    justifyContent={'center'}
                    alignItems={'center'}
                >
                    <VStack>
                        <Spinner size={'lg'} color={'darkcyan'} />
                        <Text>Loading genres...</Text>
                    </VStack>
                </Box>
            }
            { error && <h2 color={'red'}>{error.message}</h2> }
            <Stack
                height={{
                    lg: 900
                }}
                overflowY={{
                    base: 'auto'
                }}
            >
                <For each={genres?.results}
                     fallback={
                         <VStack textAlign="center" fontWeight="medium">
                             <LuBox />
                             No items to show
                         </VStack>
                     }
                >
                    {
                        (genre) => (
                            <LinkBox
                                key={genre.id}
                                onClick={() => {
                                    onGenreClick(genre.slug, genre.name)
                                }}
                                _hover={{
                                    background: 'blackAlpha.200'
                                }}
                                px={3}
                            >
                                <HStack
                                my={2}
                                gap={4}
                                >
                                    <Avatar.Root
                                        size={'xl'}
                                        shape={'rounded'}
                                    >
                                        <Avatar.Image src={genre.image_background}/>
                                        <Avatar.Fallback name={genre.name}/>
                                    </Avatar.Root>
                                    <Text
                                        textStyle={'xl'}
                                        fontWeight={ (activeLink === genre.slug) ? 'semibold' : 'normal' }
                                        color={textColor}
                                    >
                                        {genre.name}
                                    </Text>
                                </HStack>
                            </LinkBox>
                        )
                    }
                </For>
            </Stack>
        </>
    )
}

export default GenresList;
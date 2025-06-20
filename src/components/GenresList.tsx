import {Avatar, For, Heading, HStack, LinkBox, Stack, Text} from "@chakra-ui/react";
import {useColorModeValue} from "@/components/ui/color-mode.tsx";
import useGenres from "@/components/hooks/useGenres.ts";

interface GenresListProps {
    onGenreClick: (genreSlug: string, genreTitle: string) => void;
    activeLink: string;
}

const GenresList = ({ onGenreClick, activeLink }: GenresListProps) => {
    const textColor = useColorModeValue('blackAlpha.600', 'whiteAlpha.600');
    const { genres, error } = useGenres();

    return (
        <>
            <Heading
                size={'4xl'}
                mt={3}
                mb={5}
            >
                Genres
            </Heading>

            { error && <h2 color={'red'}>{error}</h2> }

            <Stack>
                <For each={genres}>
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
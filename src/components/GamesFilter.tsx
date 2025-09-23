import {Box, Heading, NativeSelect} from "@chakra-ui/react";
import type {ParentPlatform} from "@/services/parentPlatformService.ts";
import {useContext} from "react";
import {GenreContext} from "@/context/genreContext.ts";

interface GamesFilterProps {
    platformsList: ParentPlatform[];
    error: string;
    selectValue: string;
    onSelectValue: (value: string) => void
}

const GamesFilter = ({ platformsList, error, selectValue, onSelectValue}: GamesFilterProps) => {
    const { genre } = useContext(GenreContext);

    return (
        <>
            <Heading size={{ base: '3xl', md: '4xl', lg: '5xl' }}>{`${selectValue} ${genre}`} Games</Heading>
            <Box my={5}>
                <NativeSelect.Root
                    variant={'subtle'}
                    width={{ md: 'sm' }}
                >
                    <NativeSelect.Field
                        value={selectValue}
                        onChange={(e) => onSelectValue(e.target.value) }
                    >
                        { error && <option disabled={true}>{error}</option> }
                        {!error && <option value={''}>All categories</option>}
                        {
                            platformsList.map(platform => (
                                <option
                                    key={platform.id}
                                    value={platform.slug}
                                >
                                    {platform.name}
                                </option>
                            ))
                        }
                    </NativeSelect.Field>
                    <NativeSelect.Indicator />
                </NativeSelect.Root>
            </Box>
        </>
    )
}

export default GamesFilter;
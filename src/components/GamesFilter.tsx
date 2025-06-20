import {Box, Heading, NativeSelect} from "@chakra-ui/react";
import useParentPlatforms from "@/components/hooks/useParentPlatforms.ts";

interface GamesFilterProps {
    title: string;
}

const GamesFilter = ({title}: GamesFilterProps) => {
    const { platformsList, error, selectValue, setSelectValue } = useParentPlatforms();

    return (
        <>
            <Heading size={'5xl'}>{title} Games</Heading>
            <Box my={5}>
                <NativeSelect.Root
                    width={'sm'}
                    variant={'subtle'}
                >
                    <NativeSelect.Field
                        value={selectValue}
                        onChange={(e) => setSelectValue(e.target.value)}
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
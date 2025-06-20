import {Box, Heading, NativeSelect} from "@chakra-ui/react";
import {useEffect, useState} from "react";
import parentPlatformService, {type ParentPlatform} from "@/services/parentPlatformService.ts";
import {type ApiResponse, CanceledError} from "@/services/apiClient.ts";

interface GamesFilterProps {
    title: string;
}

const GamesFilter = ({title}: GamesFilterProps) => {
    const [platformsList, setPlatformsList] = useState<ParentPlatform[]>([]);
    const [error, setError] = useState('');
    const [selectValue, setSelectValue] = useState<string>('');

    useEffect(() => {
       const { request, cancel } = parentPlatformService.getAll<ApiResponse<ParentPlatform>>();

       request
           .then(res => setPlatformsList(res.data.results))
           .catch(error => {
               if (error instanceof CanceledError)
                   return;
               setError(error.message)
           })

       return (() => cancel())
    }, []);


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
                        <option value={''}>All categories</option>
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
import {useEffect, useState} from "react";
import parentPlatformService, {type ParentPlatform} from "@/services/parentPlatformService.ts";
import {type ApiResponse, CanceledError} from "@/services/apiClient.ts";

const useParentPlatforms = () => {
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

    return { platformsList, setPlatformsList, error, setError, selectValue, setSelectValue }
}

export default useParentPlatforms;
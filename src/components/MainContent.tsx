import {Grid, GridItem} from "@chakra-ui/react";
import GenresList from "@/components/GenresList.tsx";
import GamesGrid from "@/components/GamesGrid.tsx";
import GamesFilter from "@/components/GamesFilter.tsx";
import {useState} from "react";
import useParentPlatforms from "@/components/hooks/useParentPlatforms.ts";

const MainContent = () => {
    const [activeLink, setActiveLink] = useState('action');
    const [title, setTitle] = useState('Action');
    const { platformsList, error, selectValue, setSelectValue } = useParentPlatforms();

    const handleGenreClick = (genreSlug: string, genreTitle: string) => {
        setActiveLink(genreSlug);
        setTitle(genreTitle);
    }

    return (
        <Grid
            templateColumns={'repeat(4, 1fr)'}
            gap={5}
        >
            <GridItem
                colSpan={1}
            >
                <GenresList
                    activeLink={activeLink}
                    onGenreClick={handleGenreClick}
                />
            </GridItem>
            <GridItem
                colSpan={3}
            >
                <GamesFilter
                    title={title}
                    platformsList={platformsList}
                    error={error}
                    selectValue={selectValue}
                    onSelectValue={(value) => setSelectValue(value)}
                />
                <GamesGrid genre={activeLink} selectValue={selectValue}></GamesGrid>
            </GridItem>
        </Grid>
    )
}

export default MainContent;
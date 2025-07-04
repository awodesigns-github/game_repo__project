import {Provider} from "./components/ui/provider.tsx";
import NavBar from "./components/NavBar.tsx";
import {Box, Container, Grid, GridItem, IconButton} from "@chakra-ui/react";
import {useState} from "react";
import useParentPlatforms from "@/components/hooks/useParentPlatforms.ts";
import GenresList from "@/components/GenresList.tsx";
import GamesFilter from "@/components/GamesFilter.tsx";
import GamesGrid from "@/components/GamesGrid.tsx";
import {FaHamburger} from "react-icons/fa";

const App = () => {
    const [activeLink, setActiveLink] = useState('action');
    const [title, setTitle] = useState('Action');
    const { platformsList, error, selectValue, setSelectValue } = useParentPlatforms();

    const handleGenreClick = (genreSlug: string, genreTitle: string) => {
        setActiveLink(genreSlug);
        setTitle(genreTitle);
    }

    return (
        <Provider>
            <Container
                maxW={'container.xl'}
                p={{ base: 4, md: 8 }}
            >
                <Grid
                    gap={4}
                    minH={'100vh'}
                    templateAreas={{
                        base: `
                            "nav"
                            "filter"
                            "main"
                        `,
                        md: `
                            "nav nav"
                            "aside main"
                        `,
                        lg: `
                            "nav nav nav"
                            "aside main main"
                        `
                    }}
                    gridTemplateColumns={{
                        base: "1fr",
                        md: "200px 1fr",
                        lg: "250px 1fr 1fr"
                    }}
                >
                    {/* NAVBAR */}
                    <GridItem
                        area={'nav'}
                        mb={{ base: 8, md: 4 }}
                    >
                        <NavBar/>
                        <IconButton
                            variant={'surface'}
                            display={{ base: 'flex', md: 'none' }}
                            mt={4}
                            position={'fixed'}
                            zIndex={'sticky'}
                        >
                            <FaHamburger />
                        </IconButton>
                    </GridItem>

                    {/* MAIN CONTENT */}
                    <GridItem
                        area={'main'}
                        maxW={'100vw'}
                    >
                        <Box maxW={'full'}>
                            <GamesFilter
                                title={title}
                                platformsList={platformsList}
                                error={error}
                                selectValue={selectValue}
                                onSelectValue={(value) => setSelectValue(value)}
                            />
                        </Box>
                        <GamesGrid genre={activeLink} selectValue={selectValue}></GamesGrid>
                    </GridItem>

                    {/* SIDEBAR */}
                    <GridItem
                        hideBelow={'md'}
                        area={'aside'}
                    >
                        <GenresList
                            activeLink={activeLink}
                            onGenreClick={handleGenreClick}
                        />
                    </GridItem>
                </Grid>
            </Container>
        </Provider>
    );
}

export default App;
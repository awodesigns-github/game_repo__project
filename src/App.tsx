import {Provider} from "./components/ui/provider.tsx";
import NavBar from "./components/NavBar.tsx";
import {
    Box,
    CloseButton,
    Container,
    Drawer,
    Grid,
    GridItem,
    IconButton,
    useDisclosure
} from "@chakra-ui/react";
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
    const { onOpen, onClose, open } = useDisclosure();
    const [searchParam, setSearchParam] = useState("");

    // TODO: A Good place for useReducer
    const handleGenreClick = (genreSlug: string, genreTitle: string) => {
        setActiveLink(genreSlug);
        setTitle(genreTitle);
    }

    const handleSearchBarChange = (searchParam: string) => {
        setSearchParam(searchParam);
    }


    return (
        <Provider>
            <Container
                maxW={'container.xl'}
                height={{
                    lg: '100vh'
                }}
                overflow={{
                    lg: 'hidden'
                }}
                p={{ base: 4, md: 8 }}
            >
                <Grid
                    gap={4}
                    overflow={'clip'}
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
                        <NavBar searchValue={searchParam} onChangeSearchBar={handleSearchBarChange}/>
                        <IconButton
                            variant={'surface'}
                            display={{ base: 'flex', md: 'none' }}
                            mt={4}
                            position={'fixed'}
                            zIndex={'sticky'}
                            onClick={onOpen}
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
                        <GamesGrid genre={activeLink} selectValue={selectValue} searchParam={searchParam} />
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


                    <Drawer.Root open={open} placement={'start'} onOpenChange={(isOpen) => {
                        if (!isOpen) onOpen();
                        else onClose();
                    }}>
                        <Drawer.Backdrop/>
                        <Drawer.Positioner>
                            <Drawer.Content>
                                <Drawer.Header>
                                    <Drawer.Title>Genres</Drawer.Title>
                                </Drawer.Header>
                                <Drawer.Body>
                                    <GenresList
                                        activeLink={activeLink}
                                        onGenreClick={handleGenreClick}
                                    />
                                </Drawer.Body>
                                <Drawer.CloseTrigger asChild>
                                    <CloseButton onClick={onClose}/>
                                </Drawer.CloseTrigger>
                            </Drawer.Content>
                        </Drawer.Positioner>
                    </Drawer.Root>
                </Grid>
            </Container>
        </Provider>
    );
}

export default App;
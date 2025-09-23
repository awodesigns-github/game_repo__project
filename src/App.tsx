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
import {GenreContext} from "@/context/genreContext.ts";

const App = () => {
    const [currentGenre, setCurrentGenre] = useState('action');
    const { platformsList, error, selectValue, setSelectValue } = useParentPlatforms();
    const { onOpen, onClose, open } = useDisclosure();
    const [searchParam, setSearchParam] = useState("");

    const handleSearchBarChange = (searchParam: string) => {
        setSearchParam(searchParam);
    }

    return (
        <GenreContext.Provider value={{ genre: currentGenre, updateGenre: setCurrentGenre }}>
            <Provider>
                <Container
                    maxW={'container.xl'}
                    height={{
                        base: '100vh',
                        lg: '100vh'
                    }}
                    overflow={{
                        base: 'hidden',
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
                                size={'lg'}
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
                                    platformsList={platformsList}
                                    error={error}
                                    selectValue={selectValue}
                                    onSelectValue={(value) => setSelectValue(value)}
                                />
                            </Box>
                            <GamesGrid selectValue={selectValue} searchParam={searchParam} />
                        </GridItem>

                        {/* SIDEBAR */}
                        <GridItem
                            hideBelow={'md'}
                            area={'aside'}
                        >
                            <GenresList/>
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
                                        <GenresList/>
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
        </GenreContext.Provider>
    );
}

export default App;
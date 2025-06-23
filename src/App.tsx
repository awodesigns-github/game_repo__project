import {Provider} from "./components/ui/provider.tsx";
import NavBar from "./components/NavBar.tsx";
import {Box, Container} from "@chakra-ui/react";
import MainContent from "@/components/MainContent.tsx";

const App = () => {

    return (
        <Provider>
            {  }
            <Container
                width={'100vw'}
                py={5}
            >
                <NavBar></NavBar>
                <Box
                    mt={10}
                >
                    <MainContent></MainContent>
                </Box>
            </Container>
        </Provider>
    );
}

export default App;
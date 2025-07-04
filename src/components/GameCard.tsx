import {
    Badge,
    Button,
    Card,
    HStack,
    VStack,
    Image,
    Text,
    DataList,
    DataListItem,
    Wrap,
    Box,
    Flex, Skeleton
} from "@chakra-ui/react";
import {AiFillWindows} from "react-icons/ai";
import {FaPlaystation, FaXbox} from "react-icons/fa";
import {BsNintendoSwitch} from "react-icons/bs";
import { BiPlusMedical } from "react-icons/bi";
import {useState} from "react";
import type {Game} from "@/services/gamesService.ts";
import stringToDate from "@/utils/stringToDate.ts";
import { MdAddShoppingCart } from "react-icons/md";

interface GameCardProps {
    game: Game;
}

const GameCard = ({ game }: GameCardProps) => {
    const [hovered, setHovered] = useState(false);
    const [imageIsLoaded, setIsImageIsLoaded] = useState(false);

    const handleMouseEnter = () => {
        setHovered(true);
    }

    const handleMouseLeave = () => {
        setHovered(false);
    }

    return (
        <Box
            position={'relative'}
            height={{
                base: 'auto',
                lg: 'sm'
            }}
            width={'100%'}
        >
            <Card.Root
                maxW='sm'
                height='full'
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                willChange='transform'
                _hover={{
                    height: 'min-content',
                    zIndex: 10,
                    transition: 'transform 0.2s ease-in-out',
                    transform: 'perspective(1000px) translateZ(80px)',
                    boxShadow: '2xl'
                }}
            >
                <Skeleton height={'min-content'} loading={!imageIsLoaded}>
                    <Image
                        src={game.background_image}
                        alt={game.name}
                        loading={'lazy'}
                        onLoad={() => setIsImageIsLoaded(true)}
                    />
                </Skeleton>
                <Card.Body gap="2">
                    <Flex justify={'space-between'}>
                        <HStack>
                            <AiFillWindows/>
                            <FaPlaystation/>
                            <BsNintendoSwitch/>
                            <FaXbox />
                        </HStack>
                        <Badge variant={'outline'} size={'sm'}>
                            {game.metacritic}
                        </Badge>
                    </Flex>
                    <Card.Title>
                        <Text textStyle={'2xl'}>
                            {game.name}
                        </Text>
                    </Card.Title>
                    <HStack>
                        <Badge
                            size={'lg'}
                            variant={'subtle'}
                            _hover={{
                                color: 'whitesmoke',
                                background: 'darkcyan'
                            }}
                        >
                            <BiPlusMedical/>
                            {game.suggestions_count}
                        </Badge>
                    </HStack>
                    <DataList.Root
                        orientation="vertical"
                        divideY={'1px'}
                        display={{
                            base: 'block',
                            lg: hovered ? 'block' : 'none'
                        }}
                    >
                        <DataList.Item pt={4}>
                            <DataList.ItemLabel>Release Date:</DataList.ItemLabel>
                            <DataList.ItemValue>{stringToDate(game.released)}</DataList.ItemValue>
                        </DataList.Item>
                        <DataList.Item pt={4}>
                            {game.genres.length > 1 ? <DataList.ItemLabel>Genres:</DataList.ItemLabel> : <DataList.ItemLabel>Genre:</DataList.ItemLabel>}
                            <Wrap>
                                {
                                    game.genres.map(genre => (
                                        <DataListItem key={genre.id}>
                                            {genre.name}
                                        </DataListItem>
                                    ))
                                }
                            </Wrap>
                        </DataList.Item>
                        <DataList.Item pt={4}>
                            <DataList.ItemLabel>Rating:</DataList.ItemLabel>
                            <DataList.ItemValue>{game.rating} / {game.rating_top}</DataList.ItemValue>
                        </DataList.Item>
                    </DataList.Root>
                </Card.Body>
                <Card.Footer
                    display={{
                        base: 'block',
                        lg: hovered ? 'block' : 'none'
                    }}>
                    <VStack
                        width={'full'}
                        mt={{ base: 4, lg: 'none' }}
                    >
                        <Button
                            width={'full'}
                            variant={'solid'}
                            _hover={{
                                background: 'darkcyan',
                                color: 'whitesmoke',
                                fontWeight: 'semibold'
                            }}
                        >
                            <MdAddShoppingCart></MdAddShoppingCart>
                            Add to cart
                        </Button>
                        <Button width={'full'} variant={'outline'}>Add to wishlist</Button>
                    </VStack>
                </Card.Footer>
            </Card.Root>
        </Box>
    )
}

export default GameCard;
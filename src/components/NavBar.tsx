import {Avatar, Flex, Input, InputGroup, Switch, Text} from "@chakra-ui/react";
import {LuSearch} from "react-icons/lu";
import {useColorMode, useColorModeValue} from "@/components/ui/color-mode.tsx";
import reactLogo from '../assets/react.svg';


const NavBar = () => {
    const { toggleColorMode, colorMode, setColorMode } = useColorMode();
    const placeholderColor = useColorModeValue('cyan.600', 'cyan.500');

    const handleColorModeChange = () => {
        setColorMode(colorMode === 'dark' ? 'dark' : 'light');
        toggleColorMode();
    }

    return (
        <Flex
            justifyContent={'space-between'}
        >
            <Avatar.Root
                shape={'rounded'}
                variant={'subtle'}
                size={'full'}
                width={'3rem'}
                p={2}
            >
                <Avatar.Fallback name={'Game Hub'} />
                <Avatar.Image src={reactLogo} />
            </Avatar.Root>
            <InputGroup
                maxW={'65%'}
                hideBelow={'sm'}
                startElement={ <LuSearch /> }
            >
                <Input
                    size={'lg'}
                    color={placeholderColor}
                    borderRadius={'full'}
                    placeholder={'Search for games...'}
                    _placeholder={{
                        color: 'inherit'
                    }}
                    variant={'subtle'}
                />
            </InputGroup>
            <Switch.Root
                colorPalette={'cyan'}
                size={'lg'}
                onCheckedChange={() => handleColorModeChange()}
                checked={colorMode === 'dark'}
            >
                <Switch.HiddenInput />
                <Switch.Control />
                <Switch.Label>
                    <Text
                        hideBelow={'sm'}
                        textWrap={'nowrap'}
                    >{colorMode} mode</Text>
                </Switch.Label>
            </Switch.Root>
        </Flex>
    )
}

export default NavBar;
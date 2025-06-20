import {Box, createListCollection, Heading, Portal, Select, SelectItemIndicator} from "@chakra-ui/react";

interface GamesFilterProps {
    title: string;
}

const testList = createListCollection({
    items: [
        { label: 'Xbox', value: 'xbox' },
        { label: 'Playstation', value: 'play-station' },
        { label: 'PC', value: 'pc' },
        { label: 'MacOs', value: 'mac-os' },
    ]
})

const GamesFilter = ({title}: GamesFilterProps) => {
    return (
        <>
            <Heading size={'5xl'}>{title} Games</Heading>
            <Box my={5}>
                <Select.Root
                    collection={testList}
                    size={'sm'}
                    width={'320px'}
                >
                    <Select.HiddenSelect />
                    <Select.Control>
                        <Select.Trigger>
                            <Select.ValueText placeholder={'All Categories'} />
                        </Select.Trigger>
                        <Select.IndicatorGroup>
                            <Select.ClearTrigger />
                            <Select.Indicator />
                        </Select.IndicatorGroup>
                    </Select.Control>
                    <Portal>
                        <Select.Positioner>
                            <Select.Content>
                                {
                                    testList.items.map((test) => (
                                        <Select.Item key={test.label} item={test.value}>
                                            {test.label}
                                            <SelectItemIndicator />
                                        </Select.Item>
                                    ))
                                }
                            </Select.Content>
                        </Select.Positioner>
                    </Portal>
                </Select.Root>
            </Box>
        </>
    )
}

export default GamesFilter;
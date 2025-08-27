'use client';

import { createListCollection, Flex, Select } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function RefreshBar() {
    const router = useRouter();
    const [refreshIntervalId, setRefreshIntervalId] = useState<
        NodeJS.Timeout | undefined
    >(undefined);

    const refreshCollection = createListCollection({
        items: [
            { label: 'None', value: -1 },
            { label: '10 seconds', value: 10 },
            { label: '30 seconds', value: 30 },
            { label: '60 seconds', value: 60 }
        ]
    });

    return (
        <Flex justifyContent={'flex-end'}>
            <Select.Root
                collection={refreshCollection}
                width={'150px'}
                onValueChange={details => {
                    if (refreshIntervalId != undefined) {
                        clearInterval(refreshIntervalId);
                    }
                    const interval = Number(details.value.at(0));
                    console.log(`Setting refresh interval to ${interval}`);
                    if (interval != -1) {
                        const intervalId = setInterval(() => {
                            router.refresh();
                        }, interval * 1000);
                        setRefreshIntervalId(intervalId);
                    }
                }}
            >
                <Select.HiddenSelect />
                <Select.Label>Auto Refresh Period:</Select.Label>

                <Select.Control>
                    <Select.Trigger>
                        <Select.ValueText placeholder="None" />
                    </Select.Trigger>
                    <Select.IndicatorGroup>
                        <Select.Indicator />
                    </Select.IndicatorGroup>
                </Select.Control>

                <Select.Positioner>
                    <Select.Content>
                        {refreshCollection.items.map(timings => (
                            <Select.Item item={timings} key={timings.value}>
                                {timings.label}
                                <Select.ItemIndicator />
                            </Select.Item>
                        ))}
                    </Select.Content>
                </Select.Positioner>
            </Select.Root>
        </Flex>
    );
}

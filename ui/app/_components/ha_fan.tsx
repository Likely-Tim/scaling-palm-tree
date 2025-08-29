'use client';

import { Flex } from '@chakra-ui/react';
import HaToggle from './ha_toggle';
import HaSlider from './ha_slider';

export interface HaFanProps {
    state: string;
    entityId: string;
    percentage: number;
}

export default function HaFan(props: HaFanProps) {
    return (
        <Flex alignItems={'flex-end'} gap={5} flexDirection={'row'}>
            <HaSlider
                key={`${props.entityId}-${props.percentage}`}
                entityId={props.entityId}
                domain="fan"
                percentage={props.percentage}
            />
            <HaToggle
                key={`${props.entityId}-${props.state}`}
                state={props.state}
                entityId={props.entityId}
                domain="fan"
            />
        </Flex>
    );
}

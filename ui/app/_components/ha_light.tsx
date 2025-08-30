'use client';

import { Flex } from '@chakra-ui/react';
import HaSlider from './ha_slider';
import HaToggle from './ha_toggle';

export interface HaLightProps {
    state: string;
    entityId: string;
    brightness: number;
}

export default function HaLight(props: HaLightProps) {
    // Max brightness = 255
    const percentage = (props.brightness / 255) * 100;
    console.log(percentage);

    return (
        <Flex alignItems={'flex-end'} gap={5} flexDirection={'row'}>
            <HaSlider
                key={`${props.entityId}-${percentage}`}
                entityId={props.entityId}
                domain="light"
                percentage={percentage}
            />
            <HaToggle
                key={`${props.entityId}-${props.state}`}
                state={props.state}
                entityId={props.entityId}
                domain="light"
            />
        </Flex>
    );
}

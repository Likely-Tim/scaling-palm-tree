'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import {
    modifyDeviceState,
    checkPercentageChanged
} from '../_actions/server_client_actions';
import { createLoadingToast, updateToast } from '../utils/toast_utils';
import { Slider, HStack } from '@chakra-ui/react';

export interface HaSliderProps {
    entityId: string;
    domain: string;
    percentage: number;
}

export default function HaSlider(props: HaSliderProps) {
    const [disabled, setDisabled] = useState(false);
    const [sliderValue, setSliderValue] = useState(props.percentage);
    const router = useRouter();

    async function onSlider(newValue: number) {
        const toasterId = `${props.entityId}-SliderToast`;
        const change = newValue - sliderValue;
        setSliderValue(newValue);
        setDisabled(true);
        createLoadingToast(
            toasterId,
            `Trying to change speed for ${props.entityId}`
        );
        const action = change > 0 ? 'increased speed' : 'decreased speed';
        modifyDeviceState(
            props.domain,
            change > 0 ? 'increase_speed' : 'decrease_speed',
            props.entityId,
            {
                percentage_step: Math.abs(change)
            }
        );
        try {
            await checkPercentageChanged(props.entityId, props.percentage);
            updateToast(
                toasterId,
                'success',
                `Successfully ${action} ${props.entityId}`
            );
        } catch (error) {
            updateToast(
                toasterId,
                'error',
                `Failed to ${action} ${props.entityId}`
            );
        }
        setDisabled(false);
        router.refresh();
    }

    return (
        <Slider.Root
            defaultValue={[sliderValue]}
            disabled={disabled}
            width={'150px'}
            onValueChangeEnd={e => onSlider(Number(e.value.at(0)))}
        >
            <HStack justify="space-between">
                <Slider.Label>Speed</Slider.Label>
                <Slider.ValueText />
            </HStack>
            <Slider.Control>
                <Slider.Track>
                    <Slider.Range />
                </Slider.Track>
                <Slider.Thumbs />
                <Slider.Marks marks={[0, 50]} />
            </Slider.Control>
        </Slider.Root>
    );
}

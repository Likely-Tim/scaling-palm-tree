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
            `Trying to change percentage for ${props.entityId}`
        );
        modifyDeviceState(
            props.domain,
            getAction(props.domain, change),
            props.entityId,
            getChangeData(props.domain, change, newValue)
        );
        try {
            await checkPercentageChanged(
                props.entityId,
                props.domain,
                newValue
            );
            updateToast(
                toasterId,
                'success',
                `Successfully ${getActionDescription(props.domain, change)} for ${props.entityId}`
            );
        } catch (error) {
            updateToast(
                toasterId,
                'error',
                `Failed to ${getActionDescription(props.domain, change)} for ${props.entityId}`
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
                <Slider.Label>Percentage</Slider.Label>
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

function getAction(domain: string, changeAmount: number) {
    switch (domain) {
        case 'fan':
            return changeAmount > 0 ? 'increase_speed' : 'decrease_speed';
        case 'light':
            return 'turn_on';
        default:
            return '';
    }
}

function getActionDescription(domain: string, changeAmount: number) {
    switch (domain) {
        case 'fan':
            return changeAmount > 0 ? 'increased speed' : 'decreased speed';
        case 'light':
            return 'changed brightness';
    }
}

function getChangeData(domain: string, changeAmount: number, newValue: number) {
    switch (domain) {
        case 'fan':
            return {
                percentage_step: Math.abs(changeAmount)
            };
        case 'light':
            return { brightness_pct: newValue };
    }
}

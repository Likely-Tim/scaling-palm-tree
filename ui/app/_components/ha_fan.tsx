'use client';

import { Flex, HStack, Slider, Switch } from '@chakra-ui/react';
import { useState } from 'react';
import {
    checkPercentageChanged,
    checkStateChanged,
    modifyDeviceState
} from '../_actions/server_client_actions';
import { useRouter } from 'next/navigation';
import { CiNoWaitingSign } from 'react-icons/ci';
import { FaWind } from 'react-icons/fa';
import { createLoadingToast, updateToast } from '../utils/toast_utils';

export interface HaFanProps {
    state: string;
    entityId: string;
    percentage: number;
}

export default function HaFan(props: HaFanProps) {
    const [checked, setChecked] = useState(props.state === 'on' ? true : false);
    const [disabled, setDisabled] = useState(false);
    const [sliderValue, setSliderValue] = useState(props.percentage);
    const router = useRouter();

    async function onToggle(checked: boolean) {
        setDisabled(true);
        setChecked(checked);
        const toasterId = `${props.entityId}-SwitchToast`;
        createLoadingToast(toasterId, `Trying to toggle ${props.entityId}`);
        const action = checked ? 'turned on' : 'turned off';
        modifyDeviceState(
            'fan',
            checked ? 'turn_on' : 'turn_off',
            props.entityId
        );
        try {
            await checkStateChanged(props.entityId, props.state);
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
            setChecked(!checked);
        }
        setDisabled(false);
        router.refresh();
    }

    async function onSlider(newValue: number) {
        const toasterId = `${props.entityId}-SliderToast`;
        const change = newValue - sliderValue;
        setSliderValue(newValue);
        createLoadingToast(
            toasterId,
            `Trying to change speed for ${props.entityId}`
        );
        const action = change > 0 ? 'increased speed' : 'decreased speed';
        modifyDeviceState(
            'fan',
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
            setChecked(!checked);
        }
        setDisabled(false);
        router.refresh();
    }

    console.log(props.percentage);

    return (
        <Flex alignItems={'center'} gap={5} flexDirection={'row'}>
            <Slider.Root
                value={[props.percentage]}
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
            <Switch.Root
                disabled={disabled}
                size={'md'}
                checked={props.state == 'on'}
                onCheckedChange={e => onToggle(e.checked)}
            >
                <Switch.HiddenInput />
                <Switch.Label>Toggle</Switch.Label>
                <Switch.Control>
                    <Switch.Thumb />
                    <Switch.Indicator fallback={<CiNoWaitingSign />}>
                        <FaWind color="black" />
                    </Switch.Indicator>
                </Switch.Control>
            </Switch.Root>
        </Flex>
    );
}

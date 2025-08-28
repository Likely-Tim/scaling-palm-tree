'use client';

import { Flex, HStack, Slider, Switch } from '@chakra-ui/react';
import { useState } from 'react';
import {
    checkToggleState,
    getEntityState,
    modifyDeviceState
} from '../_actions/server_client_actions';
import { useRouter } from 'next/navigation';
import { CiNoWaitingSign } from 'react-icons/ci';
import { FaWind } from 'react-icons/fa';
import { getActionToast } from '../utils/toast_utils';

export interface HaFanProps {
    state: string | undefined;
    entityId: string;
    percentage: number;
}

export default function HaFan(props: HaFanProps) {
    const [checked, setChecked] = useState(props.state === 'on' ? true : false);
    const [disabled, setDisabled] = useState(false);
    const [sliderValue, setSliderValue] = useState(props.percentage);
    const router = useRouter();

    return (
        <Flex alignItems={'center'} gap={5} flexDirection={'row'}>
            <Slider.Root
                defaultValue={[sliderValue]}
                width={'150px'}
                onValueChangeEnd={async e => {
                    const priorValue = sliderValue;
                    const newValue = Number(e.value.at(0));
                    const change = newValue - priorValue;
                    console.log(priorValue, newValue, change);
                    setSliderValue(newValue);
                    modifyDeviceState(
                        'fan',
                        change > 0 ? 'increase_speed' : 'decrease_speed',
                        props.entityId,
                        {
                            percentage_step: Math.abs(change)
                        }
                    );
                }}
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
                checked={checked}
                onCheckedChange={async e => {
                    setChecked(e.checked);
                    setDisabled(true);
                    const priorState = await getEntityState(props.entityId);
                    modifyDeviceState('fan', 'toggle', props.entityId);
                    getActionToast(
                        checkToggleState(props.entityId, priorState.state),
                        'toggled',
                        props.entityId
                    );
                    setDisabled(false);
                    router.refresh();
                }}
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

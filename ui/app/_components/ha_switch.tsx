'use client';

import { Switch } from '@chakra-ui/react';
import { useState } from 'react';
import { LuMoon } from 'react-icons/lu';
import {
    checkToggleState,
    modifyDeviceState
} from '../_actions/server_client_actions';
import { useRouter } from 'next/navigation';
import { MdSunny } from 'react-icons/md';
import { createLoadingToast, updateToast } from '../utils/toast_utils';

export interface HaSwitchProps {
    state: string;
    entityId: string;
}

export default function HaSwitch(props: HaSwitchProps) {
    const [checked, setChecked] = useState(props.state === 'on' ? true : false);
    const [disabled, setDisabled] = useState(false);
    const router = useRouter();

    async function onToggle(checked: boolean) {
        setDisabled(true);
        setChecked(checked);
        const toasterId = `${props.entityId}-SwitchToast`;
        createLoadingToast(toasterId, `Trying to toggle ${props.entityId}`);
        modifyDeviceState('switch', 'toggle', props.entityId);
        try {
            await checkToggleState(props.entityId, props.state);
            updateToast(
                toasterId,
                'success',
                `Successfully toggled ${props.entityId}`
            );
        } catch (error) {
            updateToast(
                toasterId,
                'error',
                `Failed to toggle ${props.entityId}`
            );
            setChecked(!checked);
        }
        setDisabled(false);
        router.refresh();
    }

    return (
        <Switch.Root
            disabled={disabled}
            size={'md'}
            checked={checked}
            onCheckedChange={e => onToggle(e.checked)}
        >
            <Switch.HiddenInput />
            <Switch.Label>Toggle</Switch.Label>
            <Switch.Control>
                <Switch.Thumb />
                <Switch.Indicator fallback={<LuMoon />}>
                    <MdSunny color="black" />
                </Switch.Indicator>
            </Switch.Control>
        </Switch.Root>
    );
}

'use client';

import { Switch } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { LuLightbulb, LuLightbulbOff } from 'react-icons/lu';
import {
    modifyDeviceState,
    checkStateChanged
} from '../_actions/server_client_actions';
import { createLoadingToast, updateToast } from '../utils/toast_utils';

export interface HaToggleProps {
    state: string;
    entityId: string;
    domain: string;
}

export default function HaToggle(props: HaToggleProps) {
    const [checked, setChecked] = useState(props.state === 'on' ? true : false);
    const [disabled, setDisabled] = useState(false);
    const router = useRouter();

    async function onToggle(checked: boolean) {
        setDisabled(true);
        setChecked(checked);
        const toasterId = `${props.entityId}-SwitchToast`;
        createLoadingToast(toasterId, `Trying to toggle ${props.entityId}`);
        const action = checked ? 'turned on' : 'turned off';
        modifyDeviceState(
            props.domain,
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
                <Switch.Indicator fallback={<LuLightbulbOff />}>
                    <LuLightbulb color="black" />
                </Switch.Indicator>
            </Switch.Control>
        </Switch.Root>
    );
}

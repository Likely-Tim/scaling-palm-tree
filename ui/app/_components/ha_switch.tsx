'use client';

import { Switch } from '@chakra-ui/react';
import { useState } from 'react';
import { LuMoon } from 'react-icons/lu';
import {
    checkToggleState,
    getEntityState,
    modifyDeviceState
} from '../_actions/server_client_actions';
import { useRouter } from 'next/navigation';
import { MdSunny } from 'react-icons/md';
import { toaster } from './ui/toaster';
import { getActionToast } from '../utils/toast_utils';

export interface HaSwitchProps {
    state: string | undefined;
    entityId: string;
}

export default function HaSwitch(props: HaSwitchProps) {
    const [checked, setChecked] = useState(props.state === 'on' ? true : false);
    const [disabled, setDisabled] = useState(false);
    const router = useRouter();

    return (
        <Switch.Root
            disabled={disabled}
            size={'md'}
            checked={checked}
            onCheckedChange={async e => {
                setChecked(e.checked);
                setDisabled(true);
                const priorState = await getEntityState(props.entityId);
                await modifyDeviceState('switch', 'toggle', props.entityId);
                await checkToggleState(
                    props.entityId,
                    priorState.state,
                    10,
                    1000
                );
                getActionToast(
                    checkToggleState(
                        props.entityId,
                        priorState.state,
                        10,
                        1000
                    ),
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
                <Switch.Indicator fallback={<LuMoon />}>
                    <MdSunny color="black" />
                </Switch.Indicator>
            </Switch.Control>
        </Switch.Root>
    );
}

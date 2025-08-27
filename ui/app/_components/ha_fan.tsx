'use client';

import { Switch } from '@chakra-ui/react';
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
}

export default function HaFan(props: HaFanProps) {
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
                modifyDeviceState('fan', 'toggle', props.entityId);
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
                <Switch.Indicator fallback={<CiNoWaitingSign />}>
                    <FaWind color="black" />
                </Switch.Indicator>
            </Switch.Control>
        </Switch.Root>
    );
}

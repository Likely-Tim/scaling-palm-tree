'use client';

import { Switch } from '@chakra-ui/react';
import { useState } from 'react';
import { modifyDeviceState } from '../_actions/server_client_actions';
import { useRouter } from 'next/navigation';
import { CiNoWaitingSign } from 'react-icons/ci';
import { FaWind } from 'react-icons/fa';

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
            onCheckedChange={e => {
                modifyDeviceState('fan', 'toggle', props.entityId);
                setChecked(e.checked);
                setDisabled(true);
                setTimeout(() => {
                    setDisabled(false);
                    router.refresh();
                }, 1500);
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

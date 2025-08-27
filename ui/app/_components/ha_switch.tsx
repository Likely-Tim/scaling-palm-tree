'use client';

import { Switch } from '@chakra-ui/react';
import { useState } from 'react';
import { LuMoon } from 'react-icons/lu';
import { modifyDeviceState } from '../_actions/server_client_actions';
import { useRouter } from 'next/navigation';
import { MdSunny } from 'react-icons/md';

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
            onCheckedChange={e => {
                modifyDeviceState('switch', 'toggle', props.entityId);
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
                <Switch.Indicator fallback={<LuMoon />}>
                    <MdSunny color="black" />
                </Switch.Indicator>
            </Switch.Control>
        </Switch.Root>
    );
}

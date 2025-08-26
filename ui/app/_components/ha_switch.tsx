'use client';

import { Switch } from '@chakra-ui/react';
import { useState } from 'react';
import { LiaSunSolid } from 'react-icons/lia';
import { LuMoon } from 'react-icons/lu';
import { modifyDeviceState } from '../_actions/server_client_actions';

export interface HaSwitchProps {
    entityId: string;
}

export default function HaSwitch(props: HaSwitchProps) {
    const [checked, setChecked] = useState(false);

    return (
        <Switch.Root
            size={'md'}
            checked={checked}
            onCheckedChange={e => {
                modifyDeviceState('switch', 'toggle', props.entityId);
                setChecked(e.checked);
            }}
        >
            <Switch.HiddenInput />
            <Switch.Label>Toggle</Switch.Label>
            <Switch.Control>
                <Switch.Thumb>
                    <Switch.ThumbIndicator fallback={<LuMoon />}>
                        <LiaSunSolid />
                    </Switch.ThumbIndicator>
                </Switch.Thumb>
            </Switch.Control>
        </Switch.Root>
    );
}

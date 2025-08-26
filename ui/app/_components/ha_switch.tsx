'use client';

import { Switch } from '@chakra-ui/react';
import { useState } from 'react';
import { LiaSunSolid } from 'react-icons/lia';
import { LuMoon } from 'react-icons/lu';

export default function HaSwitch() {
    const [checked, setChecked] = useState(false);

    return (
        <Switch.Root
            size={'md'}
            checked={checked}
            onCheckedChange={e => setChecked(e.checked)}
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

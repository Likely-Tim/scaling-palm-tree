'use client';

import {
    ColorPicker,
    parseColor,
    HStack,
    ColorPickerChannelSlider
} from '@chakra-ui/react';
import { useState } from 'react';
import { modifyDeviceState } from '../_actions/server_client_actions';

export interface HaColorProps {
    rgbColor: number[];
    domain: string;
    entityId: string;
}

export default function HaColor(props: HaColorProps) {
    const [color, setColor] = useState(
        parseColor(
            rgbToHex(props.rgbColor[0], props.rgbColor[1], props.rgbColor[2])
        )
    );

    return (
        <ColorPicker.Root
            defaultValue={color}
            onValueChangeEnd={e => {
                setColor(e.value);
                modifyDeviceState(props.domain, 'turn_on', props.entityId, {
                    rgb_color: hexToRgb(e.value.toString('hex'))
                });
                console.log(e.value.toString('hex'));
            }}
            maxW="200px"
        >
            <ColorPicker.HiddenInput />
            <ColorPicker.Label>Color</ColorPicker.Label>
            <ColorPicker.Control>
                <ColorPicker.Trigger px="2">
                    <ColorPicker.ValueSwatch boxSize="6" />
                    <ColorPicker.ValueText minW="160px" />
                </ColorPicker.Trigger>
            </ColorPicker.Control>
            <ColorPicker.Positioner>
                <ColorPicker.Content>
                    <ColorPicker.Area />
                    <HStack>
                        <ColorPickerChannelSlider channel="hue" />
                        <ColorPicker.ValueSwatch />
                    </HStack>
                </ColorPicker.Content>
            </ColorPicker.Positioner>
        </ColorPicker.Root>
    );
}

function rgbToHex(r: number, g: number, b: number): string {
    return (
        '#' +
        [r, g, b]
            .map(x => {
                const hex = x.toString(16);
                return hex.length === 1 ? '0' + hex : hex;
            })
            .join('')
    );
}

function hexToRgb(hex: string) {
    hex = hex.replace(/^#/, '');

    if (hex.length === 3) {
        // expand shorthand like #0f8 → #00ff88
        hex = hex
            .split('')
            .map(c => c + c)
            .join('');
    }

    const num = parseInt(hex, 16);
    return [(num >> 16) & 255, (num >> 8) & 255, num & 255];
}

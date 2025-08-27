'use client';

import { Dialog, IconButton } from '@chakra-ui/react';
import { JSX } from '@emotion/react/jsx-runtime';
import { FaExternalLinkAlt } from 'react-icons/fa';

export interface DeviceCardOverlayProps {
    titleElements?: JSX.Element[];
}

export default function DeviceCardOverlay(props: DeviceCardOverlayProps) {
    return (
        <Dialog.Root>
            <Dialog.Trigger marginLeft={'auto'} asChild>
                <IconButton variant={'ghost'} size={'xs'}>
                    <FaExternalLinkAlt />
                </IconButton>
            </Dialog.Trigger>
            <Dialog.Backdrop />
            <Dialog.Positioner>
                <Dialog.Content>
                    <Dialog.CloseTrigger />
                    <Dialog.Header>{props.titleElements}</Dialog.Header>
                    <Dialog.Body />
                    <Dialog.Footer />
                </Dialog.Content>
            </Dialog.Positioner>
        </Dialog.Root>
    );
}

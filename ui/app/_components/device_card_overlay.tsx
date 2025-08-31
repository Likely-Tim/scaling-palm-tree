'use client';

import { CloseButton, Container, Dialog, IconButton } from '@chakra-ui/react';
import { JSX } from '@emotion/react/jsx-runtime';
import { FaExternalLinkAlt } from 'react-icons/fa';

export interface DeviceCardOverlayProps {
    titleElements?: JSX.Element[];
    capabilities?: JSX.Element[];
    extraCapabilities?: JSX.Element[];
    domain: string;
}

export default function DeviceCardOverlay(props: DeviceCardOverlayProps) {
    return (
        <Dialog.Root placement={'center'}>
            <Dialog.Trigger marginLeft={'auto'} asChild>
                <IconButton variant={'ghost'} size={'xs'}>
                    <FaExternalLinkAlt />
                </IconButton>
            </Dialog.Trigger>
            <Dialog.Backdrop />
            <Dialog.Positioner>
                <Dialog.Content>
                    <Dialog.CloseTrigger asChild>
                        <CloseButton size="sm" />
                    </Dialog.CloseTrigger>
                    <Dialog.Header marginBottom={'5px'}>
                        {props.titleElements}
                    </Dialog.Header>
                    <Dialog.Body>
                        <Container centerContent={true} gap={'15px'}>
                            {props.extraCapabilities}
                            {props.capabilities}
                        </Container>
                    </Dialog.Body>
                    <Dialog.Footer />
                </Dialog.Content>
            </Dialog.Positioner>
        </Dialog.Root>
    );
}

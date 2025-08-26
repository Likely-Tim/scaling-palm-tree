'use client';

import { Button, Card, Flex, Icon, Mark, Text } from '@chakra-ui/react';
import { capitalizeFirstCharacter } from '../utils/text_utils';
import { CiSun } from 'react-icons/ci';
import { MdOutlineSensors } from 'react-icons/md';
import { RxSwitch } from 'react-icons/rx';
import { TbCarFan, TbDeviceUnknown } from 'react-icons/tb';
import {
    deregisterDevice,
    registerDevice
} from '@/app/_actions/server_client_actions';
import { toaster } from './ui/toaster';
import { useRouter } from 'next/navigation';

export interface DeviceCardProps {
    domain: string;
    friendlyName: string;
    entityId: string;
    state?: string;
    showRegisterButton: boolean;
    showDeregisterButton: boolean;
}

export default function DeviceCard(props: DeviceCardProps) {
    const router = useRouter();

    return (
        <Card.Root padding={'5px'} minWidth={'250px'}>
            <Card.Header>
                <Flex gap="3" alignItems="center">
                    <Icon size="md">{getDomainIcon(props.domain)}</Icon>
                    <Text>{capitalizeFirstCharacter(props.domain)}</Text>
                </Flex>
            </Card.Header>
            <Card.Body margin={'3px'}>
                <Text>
                    <Mark variant="text">Name: </Mark>
                    {props.friendlyName}
                </Text>
                <Text>
                    <Mark variant="text">ID: </Mark>
                    {props.entityId}
                </Text>
                {props.state ? (
                    <Text>
                        <Mark variant="text">Current state: </Mark>
                        {props.state}
                    </Text>
                ) : undefined}
            </Card.Body>
            <Card.Footer justifyContent="flex-end" margin={'12px'}>
                {props.showRegisterButton ? (
                    <Button
                        onClick={async () => {
                            toaster.promise(
                                registerDevice(
                                    props.entityId,
                                    props.friendlyName
                                ),
                                {
                                    success: {
                                        title: `Successfully registered device: ${props.friendlyName}`
                                    },
                                    error: {
                                        title: `Failed to register device: ${props.friendlyName}`
                                    },
                                    loading: {
                                        title: `Trying to register device: ${props.friendlyName}`
                                    }
                                }
                            );
                            router.refresh();
                        }}
                    >
                        Register
                    </Button>
                ) : undefined}
                {props.showDeregisterButton ? (
                    <Button
                        onClick={async () => {
                            toaster.promise(
                                deregisterDevice(
                                    props.entityId,
                                    props.friendlyName
                                ),
                                {
                                    success: {
                                        title: `Successfully deregistered device: ${props.friendlyName}`
                                    },
                                    error: {
                                        title: `Failed to deregister device: ${props.friendlyName}`
                                    },
                                    loading: {
                                        title: `Trying to deregister device: ${props.friendlyName}`
                                    }
                                }
                            );
                            router.refresh();
                        }}
                    >
                        Deregister
                    </Button>
                ) : undefined}
            </Card.Footer>
        </Card.Root>
    );
}

function getDomainIcon(domain: string) {
    switch (domain) {
        case 'sensor':
            return <MdOutlineSensors />;
        case 'sun':
            return <CiSun />;
        case 'fan':
            return <TbCarFan />;
        case 'switch':
            return <RxSwitch />;
        default:
            return <TbDeviceUnknown />;
    }
}

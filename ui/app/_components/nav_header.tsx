'use client';

import {
    CloseButton,
    Drawer,
    Flex,
    IconButton,
    Link,
    Portal,
    Separator,
    Text
} from '@chakra-ui/react';
import { redirect } from 'next/navigation';
import { useState } from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';

const PATHS: { [key: string]: string } = {
    Overview: '/overview',
    Devices: '/devices'
};

export function NavHeader() {
    const [open, setOpen] = useState(false);

    const redirectClick = (path: string) => {
        setOpen(false);
        redirect(path);
    };

    return (
        <Flex
            backgroundColor="#383636"
            width="100%"
            padding="10px"
            paddingLeft="20px"
            direction="row"
            gap="4"
            marginBottom="10px"
        >
            <Drawer.Root
                open={open}
                onOpenChange={e => setOpen(e.open)}
                placement="start"
            >
                <Drawer.Trigger asChild boxShadow="md">
                    <IconButton>
                        <GiHamburgerMenu />
                    </IconButton>
                </Drawer.Trigger>
                <Portal>
                    <Drawer.Backdrop />
                    <Drawer.Positioner>
                        <Drawer.Content padding="10px">
                            <Drawer.Header>
                                <Drawer.Title>
                                    <Text marginBottom={'10px'}>
                                        Scaling Palm Tree
                                    </Text>
                                </Drawer.Title>
                            </Drawer.Header>
                            <Drawer.Body>
                                {Object.entries(PATHS).map(([label, path]) => {
                                    return (
                                        <Text
                                            key={label}
                                            cursor="pointer"
                                            paddingLeft="5px"
                                            textStyle="2xl"
                                            fontWeight="semibold"
                                            onClick={() => redirectClick(path)}
                                            _hover={{
                                                bg: 'gray.700',
                                                color: 'gray.100',
                                                fontWeight: 'bold'
                                            }}
                                            borderRadius="md"
                                        >
                                            {label}
                                            <Separator marginBottom="10px" />
                                        </Text>
                                    );
                                })}
                            </Drawer.Body>
                            <Drawer.Footer />
                            <Drawer.CloseTrigger asChild>
                                <CloseButton size="sm" />
                            </Drawer.CloseTrigger>
                        </Drawer.Content>
                    </Drawer.Positioner>
                </Portal>
            </Drawer.Root>
            <Text textStyle="3xl" fontWeight="semibold">
                <Link href="/overview">Scaling Palm Tree</Link>
            </Text>
        </Flex>
    );
}

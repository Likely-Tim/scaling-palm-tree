import { CloseButton, Drawer, For, IconButton, Portal, Separator, Text } from '@chakra-ui/react';
import React, { useState } from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';
import { useNavigate } from 'react-router';

export function NavDrawer() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const paths: { [key: string]: string } = {
    Overview: '/overview',
    Temp: '/temp'
  };

  const redirectClick = (path: string) => {
    console.log('CLICK');
    navigate(path);
  };

  return (
    <Drawer.Root open={open} onOpenChange={e => setOpen(e.open)} placement="start">
      <Drawer.Trigger asChild position="absolute" top="30px" boxShadow="md" left="30px">
        <IconButton>
          <GiHamburgerMenu />
        </IconButton>
      </Drawer.Trigger>
      <Portal>
        <Drawer.Backdrop />
        <Drawer.Positioner>
          <Drawer.Content>
            <Drawer.Header>
              <Drawer.Title>Scaling Palm Tree</Drawer.Title>
            </Drawer.Header>
            <Drawer.Body>
              <For each={Object.entries(paths)}>
                {([label, path]) => {
                  return (
                    <React.Fragment>
                      <Text
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
                      </Text>
                      <Separator paddingBottom="10px" />
                    </React.Fragment>
                  );
                }}
              </For>
            </Drawer.Body>
            <Drawer.Footer />
            <Drawer.CloseTrigger asChild>
              <CloseButton size="sm" />
            </Drawer.CloseTrigger>
          </Drawer.Content>
        </Drawer.Positioner>
      </Portal>
    </Drawer.Root>
  );
}

import {
  CloseButton,
  Drawer,
  Flex,
  For,
  IconButton,
  Link,
  Portal,
  Separator,
  Text
} from '@chakra-ui/react';
import { useState } from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';
import { useNavigate } from 'react-router';

export function NavHeader() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const paths: { [key: string]: string } = {
    Overview: '/overview',
    Devices: '/devices'
  };

  const redirectClick = (path: string) => {
    navigate(path);
    setOpen(false);
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
      <Drawer.Root open={open} onOpenChange={e => setOpen(e.open)} placement="start">
        <Drawer.Trigger asChild boxShadow="md">
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
                      <Text
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
      <Text textStyle="3xl" fontWeight="semibold">
        <Link href="/overview">Scaling Palm Tree</Link>
      </Text>
    </Flex>
  );
}

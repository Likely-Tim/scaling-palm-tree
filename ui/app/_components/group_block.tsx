import {
    Button,
    Dialog,
    Container,
    Heading,
    Portal,
    CloseButton,
    Stack
} from '@chakra-ui/react';
import AddGroupForm from './groups/add_group_form';

export interface GroupBlockProps {
    name: string;
}

export default function GroupBlock(props: GroupBlockProps) {
    return (
        <Container
            backgroundColor={'#1a1918'}
            margin={'30px'}
            padding={'20px'}
            borderRadius={'20px'}
        >
            <Heading size={'3xl'} margin={'10px'} marginLeft={'0px'}>
                {props.name}
            </Heading>
            <Dialog.Root>
                <Dialog.Trigger asChild>
                    <Button variant="outline" size={'sm'}>
                        Add
                    </Button>
                </Dialog.Trigger>
                <Portal>
                    <Dialog.Backdrop />
                    <Dialog.Positioner>
                        <Dialog.Content>
                            <Dialog.Header>
                                <Dialog.Title>Add New Group</Dialog.Title>
                            </Dialog.Header>
                            <Dialog.Body>
                                <Stack gap="4">
                                    <AddGroupForm />
                                </Stack>
                            </Dialog.Body>
                            <Dialog.Footer></Dialog.Footer>
                            <Dialog.CloseTrigger asChild>
                                <CloseButton size="sm" />
                            </Dialog.CloseTrigger>
                        </Dialog.Content>
                    </Dialog.Positioner>
                </Portal>
            </Dialog.Root>
        </Container>
    );
}

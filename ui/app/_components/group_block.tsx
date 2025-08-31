import {
    Accordion,
    Button,
    Dialog,
    Container,
    Heading,
    Portal,
    Span,
    CloseButton,
    Stack
} from '@chakra-ui/react';
import AddGroupForm from './groups/add_group_form';
import { Group } from '../_models/group';
import GroupCard from './group_card';

export interface GroupBlockProps {
    name: string;
    groups: Group[];
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
            <Container margin={'20px'}>
                <Accordion.Root collapsible>
                    {props.groups.map(group => (
                        <Accordion.Item key={group.id} value={group.name}>
                            <Accordion.ItemTrigger>
                                <Span flex="1">{group.name}</Span>
                                <Accordion.ItemIndicator />
                            </Accordion.ItemTrigger>
                            <Accordion.ItemContent>
                                <Accordion.ItemBody>
									<GroupCard group={group}/>
								</Accordion.ItemBody>
                            </Accordion.ItemContent>
                        </Accordion.Item>
                    ))}
                </Accordion.Root>
            </Container>
        </Container>
    );
}

import { Accordion, Container, Heading, HStack, Span } from '@chakra-ui/react';

import { Group } from '../_models/group';
import GroupCard from './group_card';
import AddGroupDialog from './groups/add_group_dialog';

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
            <HStack>
                <AddGroupDialog />
            </HStack>
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
                                    <GroupCard group={group} />
                                </Accordion.ItemBody>
                            </Accordion.ItemContent>
                        </Accordion.Item>
                    ))}
                </Accordion.Root>
            </Container>
        </Container>
    );
}

'use client';
import {
    Dialog,
    Portal,
    Button,
    CloseButton,
    Select,
    createListCollection
} from '@chakra-ui/react';
import { Group } from '@/app/_models/group';
import { useState } from 'react';
import { toaster } from '../ui/toaster';
import { useRouter } from 'next/navigation';
import { addGroupMember } from '@/app/_actions/server_client_actions';

export interface AddMemberDialogProps {
    groups: Group[];
    entityId: string;
}

export default function AddMemberDialog(props: AddMemberDialogProps) {
    const router = useRouter();
    const [selectedGroup, setSelectedGroup] = useState<Group | undefined>(
        undefined
    );
    const groups = createListCollection({
        items: props.groups,
        itemToString: group => group.name,
        itemToValue: group => group.id.toString()
    });
    const addMember = async () => {
        toaster.promise(
            new Promise<void>(async (resolve, reject) => {
                if (selectedGroup == undefined) {
                    reject(new Error('undefined group'));
                } else {
                    await addGroupMember(selectedGroup, props.entityId);
                    resolve();
                }
            }),
            {
                success: {
                    title: `Successfully added device`
                },
                error: {
                    title: `Failed to add device`
                },
                loading: {
                    title: `Trying to add device`
                }
            }
        );
        router.refresh();
    };

    return (
        <Dialog.Root>
            <Dialog.Trigger asChild>
                <Button variant="outline" size={'sm'}>
                    Assign Group
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
                            <Select.Root
                                collection={groups}
                                size="sm"
                                onValueChange={details =>
                                    setSelectedGroup(
                                        props.groups.find(
                                            group =>
                                                group.id.toString() ===
                                                details.value[0]
                                        )
                                    )
                                }
                                width="150px"
                                padding={'5px'}
                            >
                                <Select.HiddenSelect />
                                <Select.Label>Select Group</Select.Label>
                                <Select.Control>
                                    <Select.Trigger>
                                        <Select.ValueText placeholder="Select Group" />
                                    </Select.Trigger>
                                    <Select.IndicatorGroup>
                                        <Select.Indicator />
                                    </Select.IndicatorGroup>
                                </Select.Control>
                                <Select.Positioner>
                                    <Select.Content>
                                        {groups.items.map(group => (
                                            <Select.Item
                                                item={group}
                                                key={group.id}
                                            >
                                                {group.name}
                                                <Select.ItemIndicator />
                                            </Select.Item>
                                        ))}
                                    </Select.Content>
                                </Select.Positioner>
                            </Select.Root>{' '}
                            <Button
                                onClick={addMember}
                                size={'sm'}
                                margin={'10px'}
                            >
                                Add
                            </Button>
                        </Dialog.Body>
                        <Dialog.Footer></Dialog.Footer>
                        <Dialog.CloseTrigger asChild>
                            <CloseButton size="sm" />
                        </Dialog.CloseTrigger>
                    </Dialog.Content>
                </Dialog.Positioner>
            </Portal>
        </Dialog.Root>
    );
}

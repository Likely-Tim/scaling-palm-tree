'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Field, Input, Button, Dialog, Stack, Portal, CloseButton} from '@chakra-ui/react';
import { addGroup } from '@/app/_actions/server_client_actions';
import { toaster } from '../ui/toaster';

export default function AddGroupDialog() {
    const router = useRouter();
    const [groupName, setGroupName] = useState('');
    const [groupDetail, setGroupDetail] = useState('');
    const [errorMsg, setErrormsg] = useState('');

    const upload = async () => {
        toaster.promise(
            new Promise<void>(async (resolve, reject) => {
                try {
                    await addGroup(groupName, groupDetail);
                    setGroupName('');
                    setGroupDetail('');
                    resolve();
                } catch (error) {
                    setErrormsg(error.message);
                    reject(error);
                }
            }),
            {
                success: {
                    title: `Successfully added group : ${groupName}`
                },
                error: {
                    title: `${errorMsg}`
                },
                loading: {
                    title: `Trying to add group: ${groupName}`
                }
            }
        );
        router.refresh();
    };
    return (
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
                                   <Field.Root required>
                <Field.Label>Group Name</Field.Label>
                <Input
                    placeholder="Group Name"
                    value={groupName}
                    onChange={e => setGroupName(e.target.value)}
                />
            </Field.Root>
            <Field.Root required>
                <Field.Label>Group Description</Field.Label>
                <Input
                    placeholder="Group Description"
                    value={groupDetail}
                    onChange={e => setGroupDetail(e.target.value)}
                ></Input>
            </Field.Root>
            <Button size="sm" onClick={upload}>
                Save
            </Button>
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
                );
}

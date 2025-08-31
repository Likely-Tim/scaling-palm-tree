'use client';
import { removeGroupMember } from '@/app/_actions/server_client_actions';
import { Device } from '@/app/_models/device';
import { Group } from '@/app/_models/group';
import { Button } from '@chakra-ui/react';
import { toaster } from '../ui/toaster';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export interface RemoveMemberButtonProps {
    group: Group;
    device: Device;
}

export default function RemoveMemberButton(props: RemoveMemberButtonProps) {
    const [errorMsg, setErrormsg] = useState('');
    const router = useRouter();
    const RemoveMember = async () => {
        toaster.promise(
            new Promise<void>(async (resolve, reject) => {
                try {
                    await removeGroupMember(props.group, props.device);
                    resolve();
                } catch (error) {
                    setErrormsg(error.message);
                    reject(error);
                }
            }),
            {
                success: {
                    title: `Successfully deleted entity: ${props.device.friendly_name}`
                },
                error: {
                    title: `${errorMsg}`
                },
                loading: {
                    title: `Trying to delete entity: ${props.device.friendly_name}`
                }
            }
        );
        router.refresh();
    };

    return (
        <Button size={'xs'} variant={'outline'} onClick={RemoveMember}>
            Remove
        </Button>
    );
}

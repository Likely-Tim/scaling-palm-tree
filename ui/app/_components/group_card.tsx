import { Card, Stack } from '@chakra-ui/react';
import { Group } from '../_models/group';
import { Device } from '../_models/device';
import { getGroupMembers } from '../_actions/server_client_actions';
import DeviceCard from './device_card';
import RemoveMemberButton from './groups/remove_device_button';
import { Grid, GridItem } from '@chakra-ui/react';

export interface GroupCardProps {
    group: Group;
}

export default async function GroupCard(props: GroupCardProps) {
    const groupInfo = await getGroupMembers(props.group);
    const devices = groupInfo.devices as Device[];
    return (
        <Card.Root padding={'5px'} minWidth={'250px'}>
            <Card.Body>
                <Grid templateColumns="repeat(3, 1fr)" gap="10px">
                    {devices.map(device => (
                        <GridItem key={device.entity_id}>
                            <Stack
                                margin={'5px'}
                                justifyContent="space-between"
                                height="100%"
                                width="300px"
                            >
                                <DeviceCard
                                    domain={device.domain}
                                    friendlyName={device.friendly_name}
                                    entityId={device.entity_id}
                                />
                                <RemoveMemberButton
                                    group={props.group}
                                    device={device}
                                />
                            </Stack>
                        </GridItem>
                    ))}
                </Grid>
            </Card.Body>
            <Card.Footer></Card.Footer>
        </Card.Root>
    );
}

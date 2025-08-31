import { Container } from '@chakra-ui/react';
import GroupBlock from '../_components/group_block';
import { getGroups } from '../_actions/server_client_actions';
import { getUngroupedDevices } from '../_actions/server_client_actions';
import DeviceBlock from '../_components/device_block';

export default async function Page() {
    const groups = await getGroups();
    const ungroupedDevices = await getUngroupedDevices();
    return (
        <Container>
            <GroupBlock name={'Group Management'} groups={groups} />
            <DeviceBlock
                name={'Ungrouped Device'}
                data={ungroupedDevices}
                showAddGroupButton={true}
                groups={groups}
            />
        </Container>
    );
}

import { Metadata } from 'next';
import serverClient from '../_clients/server_client';
import { sortStates } from '../utils/state_utils';
import { DeviceWithState } from '../_models/device';
import { Container } from '@chakra-ui/react';
import DeviceBlock from '../_components/device_block';

export const metadata: Metadata = {
    title: 'Overview'
};

export default async function Page() {
    const states = await serverClient.getStates();
    sortStates(states);
    const registeredDevices = await serverClient.getRegisteredDevices();

    const devicesWithState: DeviceWithState[] = registeredDevices.map(
        device => {
            const matchingState = states.find(
                state => state.entity_id === device.entity_id
            );
            return { ...device, state: matchingState?.state || 'Unknown' };
        }
    );

    return (
        <Container>
            <DeviceBlock
                name={'Devices'}
                showDeregisterButton={false}
                showRegisterButton={false}
                data={devicesWithState}
            />
        </Container>
    );
}

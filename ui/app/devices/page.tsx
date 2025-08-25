import { Metadata } from 'next';
import serverClient from '../_clients/server_client';
import { sortStates } from '../utils/state_utils';
import { Container } from '@chakra-ui/react';
import DeviceBlock from '../_components/device_block';

export const metadata: Metadata = {
    title: 'Device Management'
};

export default async function Page() {
    const states = await serverClient.getStates();
    sortStates(states);
    const registeredDevices = await serverClient.getRegisteredDevices();

    const unregisteredStates = states.filter(
        state =>
            !registeredDevices.some(
                device => device.entity_id === state.entity_id
            )
    );

    return (
        <Container>
            <DeviceBlock
                name={'Registered Devices'}
                data={registeredDevices}
                showDeregisterButton={true}
                showRegisterButton={false}
            />
            <DeviceBlock
                name={'Unregistered Devices'}
                data={unregisteredStates}
                showDeregisterButton={false}
                showRegisterButton={true}
            />
        </Container>
    );
}

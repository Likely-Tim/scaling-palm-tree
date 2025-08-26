import { Metadata } from 'next';
import serverClient from '../_clients/server_client';
import { sortStates } from '../utils/state_utils';
import { DeviceWithCapabilities } from '../_models/device';
import { Container } from '@chakra-ui/react';
import DeviceBlock from '../_components/device_block';
import { JSX } from '@emotion/react/jsx-runtime';
import HaSwitch from '../_components/ha_switch';

export const metadata: Metadata = {
    title: 'Overview'
};

export default async function Page() {
    const states = await serverClient.getStates();
    sortStates(states);
    const registeredDevices = await serverClient.getRegisteredDevices();

    const devicesWithState: DeviceWithCapabilities[] = registeredDevices.map(
        device => {
            const matchingState = states.find(
                state => state.entity_id === device.entity_id
            );
            return {
                ...device,
                state: matchingState?.state || 'Unknown',
                capabilities: getDomainCapabilities(
                    matchingState?.domain,
                    matchingState?.entity_id
                )
            };
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

function getDomainCapabilities(
    domain: string | undefined,
    entityId: string | undefined
): JSX.Element[] {
    if (entityId == undefined) {
        return [];
    }

    switch (domain) {
        case 'switch':
            return [
                <HaSwitch key={`${entityId}_switch`} entityId={entityId} />
            ];
        default:
            return [];
    }
}

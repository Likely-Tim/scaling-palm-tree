import { Metadata } from 'next';
import serverClient from '../_clients/server_client';
import { sortStates } from '../utils/state_utils';
import { DeviceWithCapabilities } from '../_models/device';
import { Container } from '@chakra-ui/react';
import DeviceBlock from '../_components/device_block';
import { JSX } from '@emotion/react/jsx-runtime';
import HaSwitch from '../_components/ha_switch';
import HaFan from '../_components/ha_fan';
import RefreshBar from '../_components/refresh_bar';
import { State } from '../_models/state';
import HaLight from '../_components/ha_light';
import HaColor from '../_components/ha_color';

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
                capabilities: getDomainCapabilities(matchingState),
                extraCapabilities: getExtraDomainCapabilities(matchingState)
            };
        }
    );

    return (
        <Container>
            <RefreshBar />
            <DeviceBlock
                name={'Devices'}
                showPopoutButton={true}
                data={devicesWithState}
            />
        </Container>
    );
}

function getDomainCapabilities(state: State | undefined): JSX.Element[] {
    if (state == undefined) {
        return [];
    }

    switch (state.domain) {
        case 'switch':
            return [
                <HaSwitch
                    key={`${state.entity_id}_switch`}
                    entityId={state.entity_id}
                    state={state.state}
                />
            ];
        case 'fan':
            return [
                <HaFan
                    key={`${state.entity_id}_fan`}
                    entityId={state.entity_id}
                    state={state.state}
                    percentage={state.attributes.percentage}
                />
            ];
        case 'light':
            return [
                <HaLight
                    key={`${state.entity_id}_light`}
                    entityId={state.entity_id}
                    state={state.state}
                    brightness={state.attributes.brightness}
                />
            ];
        default:
            return [];
    }
}

function getExtraDomainCapabilities(state: State | undefined): JSX.Element[] {
    if (state == undefined) {
        return [];
    }

    switch (state.domain) {
        case 'light':
            return [
                <HaColor
                    domain={state.domain}
                    entityId={state.entity_id}
                    rgbColor={state.attributes.rgb_color}
                />
            ];
        default:
            return [];
    }
}

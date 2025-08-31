import { JSX } from '@emotion/react/jsx-runtime';

export interface Device {
    domain: string;
    entity_id: string;
    friendly_name: string;
}

export interface DeviceWithCapabilities extends Device {
    state: string;
    capabilities?: JSX.Element[];
    extraCapabilities?: JSX.Element[];
}

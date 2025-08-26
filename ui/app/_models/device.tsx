export interface Device {
    domain: string;
    entity_id: string;
    friendly_name: string;
}

export interface DeviceWithState extends Device {
    state: string;
}

import { SERVER_CLIENT_URL } from '../_constants/env_constants';
import { Device } from '../_models/device';
import { State } from '../_models/state';
import { getDomain } from '../utils/state_utils';

class ServerClient {
    private endpoint: string;

    constructor(endpoint: string) {
        this.endpoint = endpoint;
    }

    async getStates(): Promise<State[]> {
        const states = (await this.getCall('/states')) as State[];
        states.forEach(state => getDomain(state));
        return states;
    }

    async getRegisteredDevices(): Promise<Device[]> {
        return (await this.getCall('/devices/registered')) as Device[];
    }

    async registerDevice(entityId: string, friendlyName: string) {
        return await this.postCall('/devices/register', {
            entity_id: entityId,
            friendly_name: friendlyName
        });
    }

    async deregisterDevice(entityId: string, friendlyName: string) {
        return await this.postCall('/devices/deregister', {
            entity_id: entityId,
            friendly_name: friendlyName
        });
    }

    async modifyDeviceState(domain: string, service: string, entityId: string) {
        return await this.postCall('/devices/state/modify', {
            domain: domain,
            service: service,
            entity_id: entityId
        });
    }

    private async getCall(url: string) {
        const targetUrl = `${this.endpoint}${url}`;
        console.log(`Calling ${targetUrl}`);

        const response = await fetch(targetUrl, { cache: 'no-store' });
        if (!response.ok) {
            throw new Error(`Error response code: ${response.status}`);
        }
        return await response.json();
    }

    private async postCall(url: string, data: { [key: string]: string }) {
        const targetUrl = `${this.endpoint}${url}/`;
        console.log(`Calling ${targetUrl}`);

        const response = await fetch(targetUrl, {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error(`Error response code: ${response.status}`);
        }
        return await response.json();
    }
}

const serverClient = new ServerClient(SERVER_CLIENT_URL);

export default serverClient;

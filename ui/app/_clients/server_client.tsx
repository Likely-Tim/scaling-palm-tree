import { SERVER_CLIENT_URL } from '../_constants/env_constants';
import { Device } from '../_models/device';
import { Group } from '../_models/group';
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

    async getEntityState(entityId: string) {
        return (await this.getCall(`/devices/${entityId}/state`)) as State;
    }

    async getRegisteredDevices(): Promise<Device[]> {
        return (await this.getCall('/devices/')) as Device[];
    }

    async registerDevice(entityId: string, friendlyName: string) {
        return await this.postCall('/devices/', {
            entity_id: entityId,
            friendly_name: friendlyName
        });
    }

    async deregisterDevice(entityId: string) {
        return await this.deleteCall(`/devices/${entityId}/`);
    }

    async modifyDeviceState(
        domain: string,
        service: string,
        entityId: string,
        ext: { [key: string]: string }
    ) {
        return await this.postCall(`/devices/${entityId}/state/`, {
            domain: domain,
            service: service,
            ext: ext
        });
    }

    async getGroups() {
        return (await this.getCall(`/groups/`)) as Group[];
    }

    async addGroup(groupName: string, groupDescription: string) {
        return await this.postCall('/groups/', {
            name: groupName,
            description: groupDescription
        });
    }

    async getUngroupedDevices() {
        return (await this.getCall('/devices/?ungrouped=true')) as Device[];
    }

    async getGroupMembers(group: Group) {
        return await this.getCall(`/groups/${group.id}/member/`);
    }

    async addGroupMember(group: Group, entityId: string) {
        return await this.postCall(`/groups/${group.id}/`, {
            entity_id: entityId
        });
    }

    async removeGroupMembers(group: Group, device: Device) {
        return await this.deleteCall(
            `/groups/${group.id}/member/${device.entity_id}/`
        );
    }

    private async getCall(url: string) {
        const targetUrl = `${this.endpoint}${url}`;
        console.log(`Calling GET ${targetUrl}`);

        const response = await fetch(targetUrl, { cache: 'no-store' });
        if (!response.ok) {
            throw new Error(`Error response code: ${response.status}`);
        }
        return await response.json();
    }

    private async postCall(url: string, data: { [key: string]: any }) {
        const targetUrl = `${this.endpoint}${url}`;
        const dataJsonString = JSON.stringify(data);
        console.log(`Calling POST ${targetUrl} with data: ${dataJsonString}`);

        const response = await fetch(targetUrl, {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: dataJsonString
        });

        if (!response.ok) {
            throw new Error(`Error response code: ${response.status}`);
        }
        return await response.json();
    }

    private async deleteCall(url: string) {
        const targetUrl = `${this.endpoint}${url}`;
        console.log(`Calling DELETE ${targetUrl}`);

        const response = await fetch(targetUrl, {
            method: 'DELETE'
        });

        if (!response.ok) {
            throw new Error(`Error response code: ${response.status}`);
        }
        return await response.json();
    }
}

const serverClient = new ServerClient(SERVER_CLIENT_URL);

export default serverClient;

'use server';

import serverClient from '@/app/_clients/server_client';
import { retry } from '@/app/utils/promise_utils';
import { Group } from '../_models/group';
import { Device } from '../_models/device';
export async function registerDevice(entityId: string, friendlyName: string) {
    await serverClient.registerDevice(entityId, friendlyName);
}

export async function deregisterDevice(entityId: string) {
    await serverClient.deregisterDevice(entityId);
}

export async function modifyDeviceState(
    domain: string,
    service: string,
    entityId: string,
    ext: { [key: string]: any } = {}
) {
    await serverClient.modifyDeviceState(domain, service, entityId, ext);
}

export async function getStates() {
    return await serverClient.getStates();
}

export async function getEntityState(entityId: string) {
    return await serverClient.getEntityState(entityId);
}

export async function getGroups() {
    return await serverClient.getGroups();
}

export async function addGroup(groupName: string, groupDescription: string) {
    return await serverClient.addGroup(groupName, groupDescription);
}

export async function getGroupMembers(group: Group) {
    return await serverClient.getGroupMembers(group);
}

export async function removeGroupMember(group: Group, device: Device) {
    return await serverClient.removeGroupMembers(group, device);
}

export async function checkStateChanged(
    entityId: string,
    oldState: string,
    count: number = 10,
    delayMs: number = 1000
) {
    return await retry(
        async () => {
            const state = await getEntityState(entityId);
            if (oldState == state.state) {
                throw new Error(`${entityId} has not changed state yet`);
            }
            return state;
        },
        count,
        delayMs
    );
}

export async function checkPercentageChanged(
    entityId: string,
    domain: string,
    target: number,
    count: number = 10,
    delayMs: number = 1000
) {
    return await retry(
        async () => {
            const state = await getEntityState(entityId);
            const newPercentage =
                domain == 'light'
                    ? Math.round((state.attributes.brightness / 255) * 100)
                    : state.attributes.percentage;
            console.log(
                `Checking percentage met - target ${target}, newPercentage ${newPercentage}`
            );
            if (target != newPercentage) {
                throw new Error(`${entityId} has not hit target yet.`);
            }
            return state;
        },
        count,
        delayMs
    );
}

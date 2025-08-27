'use server';

import serverClient from '@/app/_clients/server_client';
import { retry } from '@/app/utils/promise_utils';

export async function registerDevice(entityId: string, friendlyName: string) {
    await serverClient.registerDevice(entityId, friendlyName);
}

export async function deregisterDevice(entityId: string, friendlyName: string) {
    await serverClient.deregisterDevice(entityId, friendlyName);
}

export async function modifyDeviceState(
    domain: string,
    service: string,
    entityId: string
) {
    await serverClient.modifyDeviceState(domain, service, entityId);
}

export async function getStates() {
    return await serverClient.getStates();
}

export async function getEntityState(entityId: string) {
    return await serverClient.getEntityState(entityId);
}

export async function checkToggleState(
    entityId: string,
    oldState: string,
    count: number = 10,
    delayMs: number = 1000
) {
    return await retry(
        async () => {
            const state = await getEntityState(entityId);
            if (oldState == state.state) {
                throw new Error(`${entityId} has not toggled state yet`);
            }
            return state;
        },
        count,
        delayMs
    );
}

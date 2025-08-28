'use server';

import serverClient from '@/app/_clients/server_client';
import { retry } from '@/app/utils/promise_utils';

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
    oldPercentage: number,
    count: number = 10,
    delayMs: number = 1000
) {
    return await retry(
        async () => {
            const state = await getEntityState(entityId);
            console.log(
                `Checking percentage changed - oldPercentage ${oldPercentage}, newPercentage ${state.attributes.percentage}`
            );
            if (oldPercentage == state.attributes.percentage) {
                throw new Error(`${entityId} has not changed percentage yet`);
            }
            return state;
        },
        count,
        delayMs
    );
}

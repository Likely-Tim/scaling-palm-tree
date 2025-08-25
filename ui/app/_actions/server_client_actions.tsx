'use server';

import serverClient from '@/app/_clients/server_client';

export async function registerDevice(entityId: string, friendlyName: string) {
    await serverClient.registerDevice(entityId, friendlyName);
}

export async function deregisterDevice(entityId: string, friendlyName: string) {
    await serverClient.deregisterDevice(entityId, friendlyName);
}

export async function getStates() {
    return await serverClient.getStates();
}

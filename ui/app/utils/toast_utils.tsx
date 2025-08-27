import { toaster } from '../_components/ui/toaster';

export function getActionToast(
    promise: Promise<any>,
    action: string,
    entityId: string
) {
    toaster.promise(promise, {
        success: {
            title: `Successfully ${action} ${entityId}`
        },
        loading: {
            title: `Trying to ${action} ${entityId}`
        },
        error: { title: `Failed to ${action} ${entityId}` }
    });
}

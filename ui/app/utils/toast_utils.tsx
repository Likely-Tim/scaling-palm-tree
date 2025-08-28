import { toaster } from '../_components/ui/toaster';

export function createLoadingToast(
    id: string,
    title?: string,
    description?: string
) {
    toaster.loading({ id, title, description });
}

export function updateToast(
    id: string,
    type?: string,
    title?: string,
    description?: string
) {
    toaster.update(id, { title, description, type });
}

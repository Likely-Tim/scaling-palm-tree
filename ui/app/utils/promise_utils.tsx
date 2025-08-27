export async function retry<T>(
    fn: () => Promise<T>,
    count: number,
    delayMs: number
) {
    let lastError: unknown;

    for (let i = 0; i < count; i++) {
        try {
            return await fn();
        } catch (err) {
            lastError = err;
            if (i < count - 1) {
                await wait(delayMs);
            }
        }
    }

    throw lastError;
}

async function wait(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
}

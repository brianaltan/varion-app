// src/identity.ts
import { AuthClient } from '@dfinity/auth-client';

let authClient: AuthClient | null = null;

async function initAuthClient(): Promise<AuthClient> {
    if (!authClient) {
        authClient = await AuthClient.create();
    }
    return authClient;
}

async function login(): Promise<void> {
    const client = await initAuthClient();
    await client.login({
        identityProvider: "https://identity.ic0.app",
        onSuccess: () => {
            window.location.reload();
        },
    });
}

async function isAuthenticated(): Promise<boolean> {
    const client = await initAuthClient();
    return client.isAuthenticated();
}

async function getIdentity() {
    const client = await initAuthClient();
    return client.getIdentity();
}

export { login, isAuthenticated, getIdentity, initAuthClient };

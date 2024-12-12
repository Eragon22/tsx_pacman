class PWA {
    #serviceWorkerRegistration?: ServiceWorkerRegistration;
    constructor() {
        if (isSecureContext) {
            (async () => {
                this.#serviceWorkerRegistration = await navigator.serviceWorker.register('/sw.js');
            })();
        }
    }
}

export const pwa = new PWA();
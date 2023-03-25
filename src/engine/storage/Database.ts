import Store from "./Store";
import Bundle from "@core/Bundle";

class Database extends Bundle {

    static EVENTS = Object.freeze({
        QUEUE_UPDATED: "QUEUE_UPDATED",
        DATABASE_INITIALIZED: "DATABASE_INITIALIZED",
        ...Bundle.EVENTS
    });

    version: number = Date.now(); //TODO: Find a way to handle version managment
    stores: Store[] = [];

    db: IDBDatabase | undefined;
    isInitialized: boolean = false;

    requestQueue: Function[] = [];

    constructor() {
        super(Bundle.BUNDLES.DATABASE);
    }

    start() {

        this.observer.$on(Database.EVENTS.DATABASE_INITIALIZED, () => {
            let promises: Promise<unknown>[] = [];
            this.stores.forEach((store: Store) => {
                promises.push(new Promise((res) => {
                    store.retrieve().then(() => res(store.autosave()));
                }));
            });

            Promise.all(promises).then(() => {
                this.observer.$emit(Bundle.EVENTS.BUNDLE_STARTED);
            });
        });

        this.observer.$on(Database.EVENTS.QUEUE_UPDATED, () => {
            this.browseQueue();
        });

        if (window.indexedDB) {
            let openRequest = indexedDB.open("jeesee", this.version);

            openRequest.onupgradeneeded = () => {
                const db = openRequest.result;

                this.stores.forEach(store => {
                    if (!db.objectStoreNames.contains(store.name)) {
                        db.createObjectStore(store.name, { keyPath: 'id' });
                    }
                });
            };

            openRequest.onerror = () => {
                console.error("Error", openRequest.error);
            };

            openRequest.onsuccess = () => {
                this.db = openRequest.result;

                this.observer.$emit(Database.EVENTS.DATABASE_INITIALIZED);
                this.isInitialized = true;
                this.browseQueue();
            };
        } else {
            throw new Error("IndexedDB not supported");
        }
    }

    browseQueue() {
        if (this.isInitialized) {
            let currentRequest = this.requestQueue.shift();

            if (currentRequest) {
                currentRequest(this.db);
            }

            if (this.requestQueue.length > 0) {
                this.browseQueue();
            }
        }
    }

    openStore(store: Store) {
        if (this.isInitialized) {
            throw new Error("You can't open a store after the application has started");
        }
        store.attachDB(this);
        this.stores.push(store);
    }

    addRequest(callback: Function) {
        this.requestQueue.push(callback);
        this.observer.$emit(Database.EVENTS.QUEUE_UPDATED);
    }

    getStore(name: string): Store | undefined {
        return this.stores.find(store => store.name === name);
    }


    getItem(id: string, successCallback?: Function, errorCallback?: Function): Promise<Object> {
        return new Promise((resolve, reject) => {
            this.addRequest((db: IDBDatabase) => {
                let transaction = db.transaction(this.name, "readonly");
                let storeObject = transaction.objectStore(this.name);
                let req = storeObject.get(id);

                req.onsuccess = () => {
                    if (successCallback) successCallback(req.result.value);
                    resolve(req.result.value);
                };

                req.onerror = () => {
                    if (errorCallback) errorCallback(req.error);
                    reject(req.error);
                };
            });

        });

    }

    setItem(store: Store, value: { id: string, value: any; }, instant = true) {
        return new Promise((resolve, reject) => {
            this.addRequest((db: IDBDatabase) => {

                let transaction = db.transaction(store.name, "readwrite");
                let storeObject = transaction.objectStore(store.name);

                let req = storeObject.put(value);

                let result = null;
                req.onsuccess = () => {
                    resolve(req.result);
                };

                req.onerror = () => {
                    reject(req.error);
                };

                return result;
            });
        });
    }


    getAll(store: Store) {
        return new Promise((resolve, reject) => {
            this.addRequest((db: IDBDatabase) => {
                let transaction = db.transaction(store.name, "readonly");
                let storeObject = transaction.objectStore(store.name);

                let req = storeObject.getAll();

                req.onsuccess = () => {
                    store.datas = req.result;
                    resolve(req.result);
                };

                req.onerror = () => {
                    reject(req.error);
                };
            });
        });
    }
}

export default Database;
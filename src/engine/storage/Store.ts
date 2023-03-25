import Database from "./Database";

type StoredData = {
    id: string,
    value: any;
};

class Store {

    static STORES: Record<string, string> = Object.freeze({
        INTERFACE: "interface",
        SETTINGS: "settings",
        GAME: "game"
    });

    name: string;
    db: Database | undefined;

    autosaveInterval: number = 10000;

    datas: any[] = [];

    constructor(name: string) {
        this.name = name;
    }

    save(id: string, value: any) {

        let findIndex = this.datas.findIndex((data: StoredData) => data.id === id);
        if (findIndex !== -1) {
            this.datas[findIndex].value = value;
        } else {
            this.datas.push({ id, value });
        }
    }

    get(id: string) {
        return this.datas.find((data: StoredData) => data.id === id)?.value;
    }

    getAll() {
        return this.datas;
    }

    retrieve() {
        if (this.db) {
            return this.db.getAll(this);
        }
        return Promise.resolve(true);
    }

    autosave() {
        this.datas.forEach((data: StoredData) => {
            if (this.db) {
                this.db.setItem(this, data);
            }
        });

        setTimeout(this.autosave.bind(this), this.autosaveInterval);
    }

    attachDB(db: Database) {
        this.db = db;
    }


    isValidStore(storeName: string) {
        return Object.values(Store.STORES).includes(storeName);
    }



    removeItem() {

    }


}

export default Store;
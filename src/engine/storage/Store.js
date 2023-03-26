import Database from "./Database";

class Store {

    static STORES = Object.freeze({
        INTERFACE: "interface",
        SETTINGS: "settings",
        GAME: "game"
    });

    name;
    db;

    autosaveInterval = 10000;

    datas = [];

    constructor(name) {
        this.name = name;
    }

    save(id, value) {

        let findIndex = this.datas.findIndex(data => data.id === id);
        if (findIndex !== -1) {
            this.datas[findIndex].value = value;
        } else {
            this.datas.push({ id, value });
        }
    }

    get(id) {
        return this.datas.find(data => data.id === id)?.value;
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
        this.datas.forEach(data => {
            if (this.db) {
                this.db.setItem(this, data);
            }
        });

        setTimeout(this.autosave.bind(this), this.autosaveInterval);
    }

    attachDB(db) {
        this.db = db;
    }


    isValidStore(storeName) {
        return Object.values(Store.STORES).includes(storeName);
    }



    removeItem() {

    }


}

export default Store;
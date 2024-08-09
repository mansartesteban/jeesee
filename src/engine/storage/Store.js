import Config from "@engine/Config";

class Store {

    static STORES = Object.freeze({
        INTERFACE: "interface",
        SETTINGS: "settings",
        SCENE: "scene",
        PROJECT: "project",
        CONFIG: "config"
    });

    name;
    db;

    autoSaveInterval;

    datas = [];

    constructor(name) {
        this.name = name;
        this.autoSaveInterval = Config.getConfig("database", "autoSaveInterval");
    }

    save(id, value, immediate = false) {

        let findIndex = this.datas.findIndex(data => data.id === id);
        if (findIndex !== -1) {
            this.datas[findIndex].value = value;
        } else {
            this.datas.push({ id, value });
        }

        if (immediate) {
            this.saveAll();
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
        console.log("autosave", this.name);
        this.saveAll().then(() => {
            setTimeout(this.autosave.bind(this), this.autoSaveInterval);
        });
    }

    saveAll() {
        const promises = [];
        this.datas.forEach(data => {
            if (this.db) {
                promises.push(this.db.setItem(this, data));
            }
        });
        return Promise.all(promises);
    }

    attachDB(db) {
        this.db = db;
    }

    isValidStore(storeName) {
        return Object.values(Store.STORES).includes(storeName);
    }

    removeItem() { }

}

export default Store;
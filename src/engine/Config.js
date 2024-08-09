
class Config {

    scopes = [];
    store = null;

    constructor() {

    }

    getConfig(scope = "", name = "") {
        if (!scope) {
            return this.scopes;
        }

        if (!name) {
            return this.scopes[scope];
        }

        return this.scopes[scope][name];
    }

    setConfig(scope = "", nameOrObject = "", value = "") {
        console.log("setting config");
        if (!scope) {
            throw new Error("You have to indicate which config scope you want");
        }

        if (!this.scopes[scope]) {
            this.scopes[scope] = {};
        }

        if (typeof nameOrObject === "object" && !value) {
            this.scopes[scope] = nameOrObject;
        } else {
            this.scopes[scope][nameOrObject] = value;
        }

        if (this.store) {
            Object.keys(this.scopes).forEach(scopeKey => {
                this.store.save(scopeKey, this.scopes[scopeKey]);
            });
        }
    }

    attachStore(store) {
        console.log("attach?3", store);
        this.store = store;
        this.store.datas.forEach(data => {
            console.log("data", data);
        });
    }
}


export default new Config();
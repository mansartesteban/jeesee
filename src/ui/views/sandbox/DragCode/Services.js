class Services {

    services = {};

    constructor() {

    }

    registerService(serviceName = "", service = null) {
        if (service !== null) {
            this.services[serviceName] = service;
        }
    }

    getService(serviceName = "") {
        return this.services[serviceName];
    }
}

export default new Services();
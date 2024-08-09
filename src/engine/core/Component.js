class Component {

    options = {};
    active = true;

    constructor(options) {
        if (options) {
            this.options = { ...this.options, ...options };
        }
    }

    updateComponent(entity, tick) {
        if (this.active) {
            this.update(entity, tick);
        }
    }

    update() { }
}

export default Component;
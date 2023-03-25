class Interfacor {

    node = null;
    options = {};

    constructor(options) {
        if (options) {
            this.options = { ...options, ...this.options };
        }
    }

    addNode(node) {
        if (node.node && this.node) {
            this.node.appendChild(node.node);
        }
        return this;
    }

    getNode() {
        return this.node;
    }

}

export default Interfacor;
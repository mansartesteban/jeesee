class SvgPath {

    dom = null;

    tokens = [];

    options = {
        position: {
            x: 0,
            y: 0,
        },
        size: {
            x: 0,
            y: 0
        },
        color: "yellow"
    };

    constructor(options) {
        this.dom = document.createElementNS("http://www.w3.org/2000/svg", "path");

        if (options) {
            this.options = { ...this.options, ...options };
        }

        this.dom.setAttribute("fill", "transparent");
        this.dom.setAttribute("stroke-width", ".005em");

        this.update();
    }

    addTokens(...tokens) {
        this.tokens = [...this.tokens, ...tokens];
        this.update();
    }

    update() {
        this.dom.setAttribute("d", this.transformTokens(this.tokens));
        this.dom.setAttribute("stroke", this.options.color || "black");
    }

    transformTokens(tokens) {
        return tokens;
    }


}

export default SvgPath;
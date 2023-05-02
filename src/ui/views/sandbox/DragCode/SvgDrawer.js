import MathUtils from "@/engine/utils/MathUtils";

class SvgDraw {

    dom = null;

    paths = [];
    canvas = null;

    options = {
        position: {
            x: 0,
            y: 0,
        },
        size: {
            x: 0,
            y: 0
        },
        viewBox: {
            x: 0,
            y: 0
        },
        color: "yellow"
    };

    constructor(mountOn = null, options, canvas) {
        if (options) {
            this.options = { ...this.options, ...options };
        }

        if (canvas) {
            this.canvas = canvas;
        }

        this.create();
        this.draw(mountOn);
    }

    addPath(path) {
        path.dom.setAttribute("transform", `translate(${this.options.viewBox.x / 2} ${this.options.viewBox.y / 2})`);
        this.paths.push(path);
        this.dom.appendChild(path.dom);


        // this.dom.style.border = "2px dashed cyan";
    }

    update() {

        this.dom.style.border = "2px dashed blue";
        this.dom.setAttribute("width", 0);
        this.dom.setAttribute("height", 0);

        this.paths.forEach(path => path.update());
    }

    create() {
        this.dom = document.createElementNS("http://www.w3.org/2000/svg", "svg");

        this.dom.style.left = `0px`;
        this.dom.style.top = `0px`;
        this.dom.setAttribute("viewBox", `0 0 ${this.options.viewBox.x} ${this.options.viewBox.y}`);
        this.dom.style.width = `${this.options.size.x}px`;
        this.dom.style.height = `${this.options.size.y}px`;
        this.dom.style.position = "absolute";
        this.dom.style.overflow = "visible";
    }

    draw(mountOn = null) {

        if (!mountOn) {
            mountOn = document.body;
        }

        mountOn.appendChild(this.dom);

    }

}

export default SvgDraw;
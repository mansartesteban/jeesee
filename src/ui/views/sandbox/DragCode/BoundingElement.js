import { debugBoundingBox } from "@/ui/utils/debug";
import { Vector2 } from "three";
import { generateUUID } from "three/src/math/MathUtils";

class BoundingElement {

    dom = null;
    domRect = new DOMRect();
    id = "";

    zoom = 1;

    x = 0;
    y = 0;
    width = 0;
    height = 0;
    left = 0;
    right = 0;
    top = 0;
    bottom = 0;

    constructor(id = "", element, zoom = 1) {

        if (element) {
            this.setElement(element);
        }

        this.setZoom(zoom);
        this.refresh();

        this.id = id || generateUUID();
    }

    setElement(element) {
        if (element) {
            if (element instanceof DOMRect) {
                this.domRect = element;
            } else {
                if (typeof element === "string") {
                    element = document.querySelector(element);
                }
                if (element) {
                    this.domRect = element.getBoundingClientRect();
                    this.dom = element;
                }
            }
        }
    }

    setZoom(zoom) {
        this.zoom = zoom;
        this.multiplyScalar(this.zoom);
    }

    debug(color = "") {
        debugBoundingBox(this.id, this.domRect, color);
    }

    rebindBox() {
        this.x = this.domRect.x;
        this.y = this.domRect.y;
        this.width = this.domRect.width;
        this.height = this.domRect.height;
        this.top = this.domRect.top;
        this.bottom = this.domRect.bottom;
        this.left = this.domRect.left;
        this.right = this.domRect.right;
    }

    getCenter() {
        let a = new BoundingElement("a", new DOMRect(this.x, this.y));
        a.debug("red");
        let b = new BoundingElement("b", new DOMRect(this.right, this.bottom));
        b.debug("yellow");
        let c = new BoundingElement("c", new DOMRect((this.right + this.left) / 2, (this.top + this.bottom) / 2));
        c.debug("cyan");
        console.log(this.x, this.y, this.left, this.right, this.top, this.bottom);
        return new Vector2((this.right + this.left) / 2, (this.top + this.bottom) / 2);
    }

    multiplyScalar(factor) {
        this.domRect = new DOMRect(this.domRect.x * factor, this.domRect.y * factor, this.domRect.width * factor, this.domRect.height * factor);
        this.rebindBox();
    }

    refresh() {
        this.setElement(this.dom || this.domRect);
        this.multiplyScalar(this.zoom);
    }

    clone(id = generateUUID()) {
        let newBox = new BoundingElement(id, this.dom || this.domRect, this.zoom);
        return newBox;
    }
}

export default BoundingElement;
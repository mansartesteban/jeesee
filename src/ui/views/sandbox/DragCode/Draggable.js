import { Vector2 } from "three";
import BoundingElement from "./BoundingElement";
import { generateUUID } from "three/src/math/MathUtils";

class Draggable {

    onStartCallbacks = [];
    onDragCallbacks = [];
    onEndCallbacks = [];

    dom = null;
    buttonsToHandle = [];

    zoom = 1;

    constructor(dom, buttonsToHandle) {
        this.dom = dom;
        if (!Array.isArray(buttonsToHandle)) {
            buttonsToHandle = [buttonsToHandle];
        }
        this.buttonsToHandle = buttonsToHandle;

        this.drag();
    }

    onStart(callback) {
        this.onStartCallbacks.push(callback);
    }
    onDrag(callback) {
        this.onDragCallbacks.push(callback);
    }
    onEnd(callback) {
        this.onEndCallbacks.push(callback);
    }

    setZoom(zoom = 1) {
        this.zoom = zoom;
    }

    drag() {

        let datas = {
            fromWindow: new Vector2(),
            toWindow: new Vector2(),
            fromElement: new Vector2(),
            toElement: new Vector2(),
            delta: new Vector2(),
        };

        let state = {};
        let boundingBox = new BoundingElement(generateUUID(), this.dom, this.zoom);

        let _onStartDrag = (e) => {
            e.stopPropagation();
            if (this.buttonsToHandle.includes(e.which)) {
                this.dom.setPointerCapture(e.pointerId);
                this.dom.addEventListener("pointermove", _onDrag);

                boundingBox = new BoundingElement(generateUUID(), this.dom, this.zoom);

                datas.fromWindow = new Vector2(e.clientX, e.clientY).divideScalar(this.zoom);
                datas.fromElement.copy(datas.fromWindow).sub(new Vector2(boundingBox.x, boundingBox.y).divideScalar(this.zoom));

                this.onStartCallbacks.forEach(callback => { state = { ...state, ...callback(e, datas, state) }; });
            }
        };

        let _onDrag = (e) => {
            e.stopPropagation();
            boundingBox = new BoundingElement(generateUUID(), this.dom, this.zoom);

            datas.toWindow = new Vector2(e.clientX, e.clientY);
            datas.delta = datas.toWindow.clone().sub(datas.fromWindow);
            datas.toElement.copy(datas.toWindow).divideScalar(this.zoom).sub(new Vector2(boundingBox.x, boundingBox.y));

            this.onDragCallbacks.forEach(callback => { state = { ...state, ...callback(e, datas, state) }; });

        };

        let _onEndDrag = (e) => {
            e.stopPropagation();
            if (this.buttonsToHandle.includes(e.which)) {
                this.onEndCallbacks.forEach(callback => { state = { ...state, ...callback(e, datas, state) }; });
                this.dom.releasePointerCapture(e.pointerId);
                this.dom.removeEventListener("pointermove", _onDrag);
            }
        };

        this.dom.addEventListener("pointerdown", _onStartDrag);
        this.dom.addEventListener("pointerup", _onEndDrag);
    }
}

export default Draggable;
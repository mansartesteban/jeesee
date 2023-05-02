import Block from "./Block";
import { Vector2 } from "three";
import BoundingElement from "./BoundingElement";

class Canvas {

    position = new Vector2();
    size = new Vector2();
    coordinates = {
        min: new Vector2(),
        max: new Vector2()
    };

    zoom = 1;
    zoomCallbacks = [];

    dom = null;
    containerBoundingBox = null;
    boundingBox = null;

    options = {
        gridSpacing: 1
    };

    tmpSnapping = false;
    snapping = false;

    constructor(dom, size, options = {}) {

        this.dom = dom;

        if (options) {
            const { snapping, ...opts } = options;
            this.toggleSnapping(snapping);
            this.options = { ...this.options, ...opts };
        }

        this.size = size;
        this.coordinates.min = this.size.clone().divideScalar(2).divideScalar(-1 * this.options.gridSpacing);
        this.coordinates.max = this.size.clone().divideScalar(2).divideScalar(this.options.gridSpacing);

        let containerBox = document.getElementsByClassName("drag-code-canvas");
        containerBox = containerBox[0];
        this.containerBoundingBox = new BoundingElement("container-box", containerBox, this.zoom);

        this.boundingBox = new BoundingElement("bounding-box", this.dom, this.zoom);

    }

    getZoom() {
        return this.zoom;
    }

    setZoom(zoom = 1) {
        this.zoom = zoom;
        this.zoomCallbacks.forEach(callback => callback(this.zoom));
    }

    onZoom(callback) {
        this.zoomCallbacks.push(callback);
    }

    toggleSnapping(forceState = undefined) {
        this.snapping = forceState !== undefined ? forceState : !this.snapping;
    }

    coordinatesToPosition(coordinates) {
        return coordinates.multiplyScalar(this.options.gridSpacing);
    }

    positionToCoordinates(position = new Vector2(), size = new Vector2(), clamp = false, snapped = false) {

        // this.boundingBox.zoom = this.zoom;
        // this.boundingBox.refresh();
        let b = new BoundingElement("orange", this.dom, this.zoom);

        let coordinates = position.clone();
        let boxPosition = new Vector2(b.x, b.y);

        b.debug("orange");

        coordinates.sub(boxPosition);
        coordinates.divideScalar(this.zoom);
        coordinates.sub(this.size.clone().divideScalar(2));
        coordinates.divideScalar(this.options.gridSpacing);

        if (clamp) {
            coordinates.clamp(this.coordinates.min, this.coordinates.max.clone().sub(size.clone().divideScalar(this.options.gridSpacing)));
        }

        if (snapped) {
            coordinates.round();
        }

        return coordinates;
    }

    getMousePosition(e, snapped = true) {
        return this.positionToCoordinates(new Vector2(e.clientX, e.clientY), new Vector2(), true, snapped);
    }

    createBlock(...args) {
        let block = new Block(...args);
        block.bindCanvas(this);
        return block;
    }
}

export default Canvas;
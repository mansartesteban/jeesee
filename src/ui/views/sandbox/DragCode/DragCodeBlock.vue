<template>
    <div
        ref="block"
        class="drag-code-block"
        :style="computeStyle"
    >
        <div class="block-header d-flex flex flex-nowrap justify-content-center">
            {{ block.title }}
        </div>
        <div class="block-body d-flex flex-column align-items-center justify-content-center pn-4">
            <div
                ref="anchor"
                class="anchor"
            ></div>
        </div>
    </div>
</template>
<script>
import { Vector2 } from 'three';
import Block from './Block';
import MathUtils from '@/engine/utils/MathUtils';
import Draggable from './Draggable';
import { MOUSE } from "./Mouse";
import SvgPath from './SvgPath';
import Services from './Services';
import BoundingElement from './BoundingElement';

export default {
    props: {
        block: {
            type: Block,
            required: true
        }
    },
    data() {
        return {
            MathUtils,
            boundingBox: new DOMRect(0, 0, 0, 0),
            initialPosition: new Vector2(this.block.canvas.width / 2, this.block.canvas.height / 2),
            deltaGrabbing: { x: 0, y: 0 },
            hasDragged: false,
            shiftPressed: false
        };
    },
    computed: {
        computeStyle() {

            let position = {
                x: this.block.position.x * this.block.canvas.options.gridSpacing,
                y: this.block.position.y * this.block.canvas.options.gridSpacing
            };

            return {
                "outline": this.block.selected ? "2px dashed yellow" : "",
                "border-color": this.getColor(this.block.type, 1),
                "--border-width": `${this.block.borderWidth}px`,
                left: `${this.block.canvas.size.x / 2}px`,
                top: `${this.block.canvas.size.y / 2}px`,
                transform: `translate(${position.x}px, ${position.y}px)`
            };
        }
    },
    methods: {

        getColor(type, opacity) {
            const colors = {
                "statement": `rgba(170, 86, 206, ${opacity})`,
                "constant": `rgba(208, 77, 37, ${opacity})`,
                "variable": `rgba(129, 193, 75, ${opacity})`,
                "custom-function": `rgba(255, 180, 0, ${opacity})`,
                // "constant": `rgba(167, 29, 49, ${opacity})`,
                // "constant": `rgba(167, 29, 49, ${opacity})`,
                // "constant": `rgba(167, 29, 49, ${opacity})`,
            };
            return colors[type] || "var(--secondary-color)";
        },

        clickOutside(e) {
            if (!e.shiftKey) {
                this.block.selected = false;
                document.body.removeEventListener("pointerup", this.clickOutside);
            }
        }
    },
    mounted() {

        let drag = new Draggable(this.$refs["block"], MOUSE.LEFT);

        this.block.canvas.onZoom((zoom) => {
            drag.setZoom(zoom);
        });


        drag.onStart((e, { fromElement }) => {
            drag.setZoom(this.block.canvas.zoom);
            this.$refs["block"].style.cursor = "grabbing";
        });

        drag.onDrag((e, { fromElement, toWindow }) => {
            let newPosition = toWindow.clone().sub(fromElement.clone().multiplyScalar(this.block.canvas.zoom));
            this.block.position = this.block.canvas.positionToCoordinates(newPosition, this.block.size, true, this.block.canvas.snapping);
        });

        drag.onEnd(() => {
            this.$refs["block"].style.cursor = "";
        });


        this.boundingBox = this.$refs["block"].getBoundingClientRect();

        let ceiledWidth = Math.ceil((this.boundingBox.width + this.block.borderWidth) / this.block.canvas.options.gridSpacing) * this.block.canvas.options.gridSpacing;
        let ceiledHeight = Math.ceil((this.boundingBox.height + this.block.borderWidth) / this.block.canvas.options.gridSpacing) * this.block.canvas.options.gridSpacing;

        this.block.size = new Vector2(ceiledWidth, ceiledHeight);

        this.$refs["block"].style.width = `${ceiledWidth}px`;
        this.$refs["block"].style.height = `${ceiledHeight}px`;
        this.$refs["block"].style.left = `${this.block.canvas.width / 2}px`;
        this.$refs["block"].style.top = `${this.block.canvas.height / 2}px`;

        this.boundingBox = this.$refs["block"].getBoundingClientRect();

        let svgDrawer = Services.getService("svg-drawer");

        let dragCurve = new Draggable(this.$refs["anchor"], MOUSE.LEFT);

        dragCurve.onStart((e) => {

            let path = new SvgPath({ color: "lime" });
            svgDrawer.addPath(path);
            path.update();

            return {
                path
            };

        });


        dragCurve.onDrag((e, { toWindow, fromWindow }, state) => {

            let anchorBox = new BoundingElement("anchor", e.target, this.block.canvas.zoom);
            anchorBox.debug("fuchsia");

            console.log("anchorBox.getCenter()",
                anchorBox.getCenter(),
                this.block.canvas.positionToCoordinates(anchorBox.getCenter(), new Vector2(), true),
                this.block.canvas.positionToCoordinates(anchorBox.getCenter(), new Vector2(), true).multiplyScalar(this.block.canvas.options.gridSpacing)
            );

            let a = new BoundingElement("azazraraz", new DOMRect(anchorBox.getCenter().x, anchorBox.getCenter().y));
            a.debug("blue");

            let from = this.block.canvas.positionToCoordinates(anchorBox.getCenter(), new Vector2(), true);

            // let from = this.block.canvas.positionToCoordinates(fromWindow, new Vector2(), true);
            let to = this.block.canvas.positionToCoordinates(toWindow, new Vector2(), true);

            let curves = [
                [from.x - (from.x - to.x) / 2, from.y].join(" "),
                [to.x + (from.x - to.x) / 2, to.y].join(" "),
                [to.x, to.y].join(" ")
            ];

            state.path.tokens = `M ${from.x} ${from.y} C ${curves.join(" ")}`;
            state.path.update();
        });

    }
};
</script>
<style lang="scss">
@import "@styles/vars";

.drag-code-block {
    // cursor: grab;
    --border-width: 2px;
    position: absolute;
    padding: .25em;
    background: rgba($secondary, .25);
    border-radius: 5px;
    border: var(--border-width) solid cornflowerblue;
    user-select: none;
    box-sizing: border-box;
}

.anchor {
    width: 4px;
    height: 4px;
    border-radius: 99px;
    border: 2px solid royalblue;
    padding: .25em;
    box-sizing: border-box;

    &:hover {
        border-color: blue;
        transform: scale(1.5);
    }
}

</style>


<!-- 
    Block type color:
    - if/else/elseif, for/while => purple
    - break, continue, exit
    - &&, ||, AND, OR
    - custom function
    - object/class
    - var
    - constant

-->
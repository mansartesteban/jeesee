<template>
    <div
        ref="main"
        class="d-flex flex-column"
        style="position: relative; width: 100%; height:100%"
    >
        <!-- <div
            class="load-screen d-flex flex-column align-items-center justify-content-center"
            v-if="loading"
        ></div> -->

        <div>
            <Button
                @click="canvas.toggleSnapping()"
                class="m-4"
                color="primary"
                rounded
                icon="magnet"
            >Snap to grid : {{ canvas?.snapping }}</Button>

            <Button
                @click="canvas.setZoom(1)"
                rounded
                color="info"
            >Reset zoom : {{ MathUtils.num(canvas?.getZoom()) }}</Button>
        </div>

        <div
            ref="drag-code-canvas"
            class="drag-code-canvas d-flex flex"
        >

            <div
                ref="drag-code-area"
                class="drag-code-area"
                :style="areaStyle"
            >

                <canvas
                    ref="dots-grid"
                    class="dots-grid"
                ></canvas>

                <DragCodeBlock
                    v-for="block in blocks"
                    :block="block"
                ></DragCodeBlock>

            </div>

        </div>

        <ContextMenu
            ref="ctx-menu"
            :items="canvasMenuItems"
        ></ContextMenu>
    </div>
</template>
<script>
/*
OK - Limit the position of area when corners are on the middle of the screen
OK - Dragging a block shouldn't overflow the main area
OK - Add grid or dots
OK - Improve dot displayt performances (maybe try to create dots with SVG or canvas ?)
OK - When dragging area, block are dragging twice more
OK - After moving main area, block can't move vertically anymore
OK - Add option to make dragging snapped to grid
OK - Instead of instanciate new block with canvas as parameters, create a function in Canvas class to create blocks (this.canvas.createBlock())
OK - Instead of snapping center of block, snap edges
OK - Add grabbing cursor while dragging + user-select:none
OK - Make the size of the blocks corresponding to gridSpacing (round up to closest multiple of gridSpacing)
OK - Add zoom level
OK - Add selection of block 
OK - Add multiple selection 
OK - Instead of doing all calculation with positioning, 
    couldn't I just pass coordinate from 0 to Math.round(this.canvas.width / this.canvas.options.gridSpacing)
    so for a 500x500 grid, i have coordinates from (-250, -250) to (250, 250)
    When it snapToGrid is inactive, authorize float number otherelse not
OK - Position new block close to the mouse position


TODO:
- Add alignement with other block
- Add snap to other block
- Add drag to multiple element at the same time
- Find a workaround for dot grid draw performances
- Review the while entire positionning system i should only work with canvas position, not screen or mouse

FIXME:


INTENSE REFLEXIONS : 
About event listeners
Create custom events listeners for handling all what I need
click outside, chain listener (apply stepped callback), mouse up/down/drag ...


*/

import { clamp } from "three/src/math/MathUtils";
import Canvas from "./Canvas";
import MathUtils from "@/engine/utils/MathUtils";
import BoundingElement from "./BoundingElement";
import SvgDrawer from "./SvgDrawer";
import SvgPath from "./SvgPath";
import { Vector2 } from "three";
import Draggable from "./Draggable";
import { MOUSE } from "./Mouse";
import Services from "./Services";

export default {
    data() {
        return {
            loading: true,
            MathUtils,
            canvas: null,
            contextMenuOpened: false,
            blocks: [],
            canvasMenuItems: [
                {
                    label: "New block",
                    callback: (e) => {
                        this.blocks.push(this.canvas.createBlock("unknown", "Test new block", this.canvas.getMousePosition(e)));
                    }
                },
                {
                    divider: true
                },
                {
                    label: "Mode : Suppression"
                },
                {
                    label: "Mode : Edition"
                }
            ],
            creatingPath: null
        };
    },
    computed: {
        areaStyle() {
            return {
                zoom: this.canvas?.getZoom(),
                transform: `translate(${this.canvas?.position.x}px, ${this.canvas?.position.y}px)`,
                "--width": this.canvas?.size.x + "px",
                "--height": this.canvas?.size.y + "px",
            };
        }
    },
    methods: {

        async createGrid() {
            const ctx = this.$refs["dots-grid"].getContext("2d");
            this.$refs["dots-grid"].width = this.canvas.size.x;
            this.$refs["dots-grid"].height = this.canvas.size.y;
            ctx.clearRect(0, 0, this.canvas.size.x, this.canvas.size.y);

            for (let i = 1; i < this.canvas.coordinates.max.x - this.canvas.coordinates.min.x; i++) {
                for (let j = 1; j < this.canvas.coordinates.max.y - this.canvas.coordinates.min.y; j++) {

                    ctx.fillStyle = i === this.canvas.coordinates.max.x || j === this.canvas.coordinates.max.y ? "#40c2adaa" : "#40c2ad55";

                    if (i === this.canvas.coordinates.max.x && j === this.canvas.coordinates.max.y) {
                        ctx.fillStyle = "#40c2adff";
                    }

                    ctx.beginPath();
                    ctx.arc(i * this.canvas.options.gridSpacing, j * this.canvas.options.gridSpacing, 1, 0, 2 * Math.PI, false);
                    ctx.fill();

                }
            }
        },
    },
    mounted() {


        this.$refs["drag-code-area"].addEventListener("wheel", (e) => {
            this.canvas.setZoom(clamp(this.canvas.getZoom() + (e.deltaY < 0 ? 1 / 10 : -1 / 10), .1, 3));
        });

        this.$refs["drag-code-area"].addEventListener("contextmenu", (e) => {
            if (!this.contextMenuOpened) {

                this.$refs["drag-code-area"].releasePointerCapture(e.pointerId);
                e.preventDefault();
                this.$refs["ctx-menu"].openMenu(e);
                this.contextMenuOpened = true;

                this.$refs["ctx-menu"].onClose(() => {
                    this.contextMenuOpened = false;
                });

            } else {
                this.$refs["ctx-menu"].closeOnBlur(e);
            }
        });

        this.canvas = new Canvas(
            this.$refs["drag-code-area"],
            // new Vector2(10000, 10000),
            new Vector2(800, 600),
            // new Vector2(1000, 1000),
            {
                gridSpacing: 20,
                snapping: true
            }
        );

        this.canvas.zoom = 2;

        let container = new BoundingElement("canvas", this.$refs["drag-code-canvas"]);
        container.zoom = this.canvas.getZoom();
        container.refresh();

        let drag = new Draggable(this.$refs["drag-code-canvas"], MOUSE.WHEEL);

        drag.onStart(() => {
            return {
                initPosition: this.canvas.position.clone()
            };
        });

        drag.onDrag((event, { delta }, state) => {
            let min = this.canvas.size.clone().divideScalar(-2);
            let max = this.canvas.size.clone().divideScalar(2);
            this.canvas.position.copy(state.initPosition).add(delta.divideScalar(this.canvas.getZoom())).clamp(min, max);
        });


        let svgDrawer = new SvgDrawer(this.$refs["drag-code-area"], {
            position: {
                x: -this.canvas.width / 2,
                y: -this.canvas.height / 2,
            },
            size: {
                x: this.canvas.width,
                y: this.canvas.height
            },
            viewBox: {
                x: this.canvas.size.x / this.canvas.options.gridSpacing,
                y: this.canvas.size.y / this.canvas.options.gridSpacing,
            }
        }, this.canvas);

        Services.registerService("svg-drawer", svgDrawer);

        document.body.addEventListener("keydown", (e) => {
            this.canvas.toggleSnapping(e.ctrlKey);
        });
        document.body.addEventListener("keyup", (e) => {
            this.canvas.toggleSnapping(e.ctrlKey);
        });

        this.createGrid();

        this.blocks = [
            this.canvas.createBlock("statement", "For loop", new Vector2(-10, -10)),
            this.canvas.createBlock("statement", "While loop", new Vector2(10, -10)),
            this.canvas.createBlock("statement", "If statement", new Vector2(-10, 10)),
            this.canvas.createBlock("statement", "Or condition", new Vector2(10, 10)),
            this.canvas.createBlock("variable", "numberOfBlocks", new Vector2(5, 12)),
            this.canvas.createBlock("custom-function", "make_it_readable_for_humans", new Vector2(-15, 12)),
            this.canvas.createBlock("constant", "EVENT_TYPES", new Vector2(-10, 0)),
        ];

    }
};
</script>
<style lang="scss">
@import "@styles/vars";

.drag-code-canvas {
    position: relative;
    overflow: hidden;

    .drag-code-area {
        --width: 100px;
        --height: 100px;
        --border-width: 2px;
        position: absolute;
        border: var(--border-width) dashed rgba($primary, .25);
        width: var(--width);
        height: var(--height);
        left: calc(50% - var(--width) / 2);
        top: calc(50% - var(--height) / 2);
        border-radius: 5px;
        box-sizing: content-box;
        
        .dots-grid {
            position: absolute;
            width: 100%;
            height: 100%;
            pointer-events: none;
            box-sizing: border-box;
        }

        svg {
        pointer-events: none;
        }
        
    }

}
</style>
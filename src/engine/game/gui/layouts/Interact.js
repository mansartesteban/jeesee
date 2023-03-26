import MiniVector2 from "@/engine/core/geometry/MiniVector2";
import MathUtils from "@/engine/utils/MathUtils";
import BlockLayout from "./BlockLayout";
import GuiLayout from "./GuiLayout";

class Interact {

    options = {
        snapStrength: 1
    };

    block;
    otherBlocks;

    isLocked = false;

    constructor(block, otherBlocks, options) {
        this.options = { ...this.options, ...options };

        this.block = block;
        this.otherBlocks = otherBlocks;

        // Forget it ... JavaScript logic 🤣
        this.resizableMouseDown = this.resizableMouseDown.bind(this);
        this.resizableMouseUp = this.resizableMouseUp.bind(this);
        this.resizableMouseMove = this.resizableMouseMove.bind(this);
        this.movableMouseDown = this.movableMouseDown.bind(this);
        this.movableMouseUp = this.movableMouseUp.bind(this);
        this.movableMouseMove = this.movableMouseMove.bind(this);

    }

    lock() {
        if (this.block.node) {
            this.block.node.classList.toggle("is-locked", true);
        }
        this.isLocked = true;
    }

    unlock() {
        if (this.block.node) {
            this.block.node.classList.toggle("is-locked", false);
        }
        this.isLocked = false;
    }

    makeMovable() {
        if (this.block.node) {
            this.block.node.addEventListener("mousedown", this.movableMouseDown);
        }
    }

    makeResizable(resizableOnX, resizableOnY) {
        if (resizableOnX) {
            this.createResizer("left");
            this.createResizer("right");
        }
        if (resizableOnY) {
            this.createResizer("top");
            this.createResizer("bottom");
        }
    }

    resizableMouseDown(e) {
        e.preventDefault();
        e.stopPropagation();

        if (!this.isLocked) {
            let movingSide = e.currentTarget.getAttribute("moving-side");

            if (movingSide) {
                let directionDatas = this.getDirections(movingSide);

                document.body.classList.toggle("resize-" + directionDatas.mainAxe, true);

                // If node exists to the DOM
                if (this.block.node) {

                    // Add classes to apply specific style
                    this.block.node.classList.toggle("resizing-" + movingSide, true);
                    this.block.node.classList.toggle("moving", true);

                    if (movingSide) {
                        document.documentElement.setAttribute("moving-side", movingSide);
                    }

                    // Handle the resizing constraints while moving the mouse (snap to other blocks, border limits ...)
                    document.documentElement.addEventListener("mousemove", this.resizableMouseMove);
                    document.documentElement.addEventListener("mouseup", this.resizableMouseUp);
                }
            }
        }

    }
    resizableMouseMove(e) {
        e.preventDefault();
        e.stopPropagation();

        let movingSide = e.currentTarget.getAttribute("moving-side");
        if (movingSide) {
            let directionDatas = this.getDirections(movingSide);

            // Get mouse position transform from 0 to 100
            let mousePosition = GuiLayout.getMouseLayoutPosition(e.clientX, e.clientY);

            // Get mopuse position on current main axe
            let pos = mousePosition[directionDatas.mainAxe];

            if (this.otherBlocks) {
                // Check collisions/snappings with other blocks
                for (let i = 0; i < this.otherBlocks.length; i++) {

                    let otherblock = this.otherBlocks[i];

                    // Doesn't apply calculation on current block
                    if (otherblock !== this.block && !otherblock.isClosed) {

                        // Check if the block is close enough to apply calculation (with snapStrength)
                        if (
                            otherblock.currentPosition.from[directionDatas.crossAxe] < (this.block.targetPosition.to[directionDatas.crossAxe] + this.options.snapStrength)
                            &&
                            otherblock.currentPosition.to[directionDatas.crossAxe] > (this.block.targetPosition.from[directionDatas.crossAxe] - this.options.snapStrength)
                        ) {

                            // Check is current edge is close enough to snap on first edge of other block within the main axe
                            if (Math.abs(mousePosition[directionDatas.mainAxe] - otherblock.currentPosition[directionDatas.from][directionDatas.mainAxe]) < this.options.snapStrength) {
                                pos = otherblock.currentPosition[directionDatas.from][directionDatas.mainAxe];
                                break;
                            }

                            // Check is current edge is close enough to snap on second edge of other block within the main axe
                            if (Math.abs(mousePosition[directionDatas.mainAxe] - otherblock.currentPosition[directionDatas.oppositeFrom][directionDatas.mainAxe]) < this.options.snapStrength) {
                                pos = otherblock.currentPosition[directionDatas.oppositeFrom][directionDatas.mainAxe];
                                break;
                            }

                        }

                    }
                }
            }

            // Calculate if current edge is passing through layout border and reposition it to the limits with snapStrength
            pos = pos > 100 - this.options.snapStrength ? 100 : (pos < this.options.snapStrength ? 0 : pos);

            // Finally apply calculted new position of the edge and recalculate size of the block
            this.block.targetPosition[directionDatas.from][directionDatas.mainAxe] = Math.abs(this.block.targetPosition[directionDatas.oppositeFrom][directionDatas.mainAxe] - pos) >= this.options.snapStrength ? pos : this.block.targetPosition[directionDatas.oppositeFrom][directionDatas.mainAxe];
            this.block.targetPosition.size[directionDatas.mainAxe] = Math.abs(this.block.targetPosition[directionDatas.from][directionDatas.mainAxe] - this.block.targetPosition[directionDatas.oppositeFrom][directionDatas.mainAxe]);

            // Emit an event on observer to annouce the block has resized
            this.block.observer.$emit(BlockLayout.EVENTS.BLOCK_RESIZE);
        }
    }

    resizableMouseUp(e) {

        let movingSide = (e.currentTarget).getAttribute("moving-side");

        if (movingSide) {
            let directionDatas = this.getDirections(movingSide);

            // Reinitialize classes and events to original after the mouse click is up
            e.preventDefault();
            e.stopPropagation();
            document.body.classList.toggle("resize-" + directionDatas.mainAxe, false);
            if (this.block.node) {
                this.block.node.classList.toggle("resizing-" + movingSide, false);
                this.block.node.classList.toggle("moving", false);
            }
            document.documentElement.removeEventListener("mousemove", this.resizableMouseMove);
            document.documentElement.removeEventListener("mouseup", this.resizableMouseUp);
        }
    }
    movableMouseDown(e) {
        e.preventDefault();
        e.stopPropagation();
        if (!this.isLocked) {
            if (this.block.node) {
                this.block.node.classList.toggle("moving", true);
            }

            // Calculate the original position of the mouse on the block to for next calculations
            let originalPosition = GuiLayout.getMouseLayoutPosition(e.clientX, e.clientY);
            let deltaPosition = new MiniVector2(
                originalPosition.x - this.block.targetPosition.from.x,
                originalPosition.y - this.block.targetPosition.from.y
            );

            document.documentElement.setAttribute("delta-position-x", deltaPosition.x.toString());
            document.documentElement.setAttribute("delta-position-y", deltaPosition.y.toString());

            document.documentElement.addEventListener("mousemove", this.movableMouseMove);
            document.documentElement.addEventListener("mouseup", this.movableMouseUp);
        }
    }

    movableMouseMove(e) {

        let mousePosition = GuiLayout.getMouseLayoutPosition(e.clientX, e.clientY);

        let deltaPositionX = document.documentElement.getAttribute("delta-position-x");
        let deltaPositionY = document.documentElement.getAttribute("delta-position-y");


        if (deltaPositionX && deltaPositionY) {

            // MathUtils.minMax(x, 0, 100) permits to not overtake the window
            let xTo = MathUtils.minMax(mousePosition.x - +deltaPositionX + this.block.targetPosition.size.x, 0, 100);
            let yTo = MathUtils.minMax(mousePosition.y - +deltaPositionY + this.block.targetPosition.size.y, 0, 100);
            let xFrom = MathUtils.minMax(mousePosition.x - +deltaPositionX, 0, 100);
            let yFrom = MathUtils.minMax(mousePosition.y - +deltaPositionY, 0, 100);


            // Used for styling edges which are sticked to other blocks or screen edges
            let isLeftSnapped = false;
            let isRightSnapped = false;
            let isTopSnapped = false;
            let isBottomSnapped = false;


            // An array of magnetics points on axe X (by default, edges of window)
            let edgesOnX = [];
            edgesOnX.push(0);
            edgesOnX.push(100);

            // An array of magnetics points on axe Y (by default, edges of window)
            let edgesOnY = [];
            edgesOnY.push(0);
            edgesOnY.push(100);

            if (this.otherBlocks) {
                // For each block, push both X and Y edges to respectives arrays and create a kind of "constraints list"
                for (let i = 0; i < this.otherBlocks.length; i++) {
                    let otherblock = this.otherBlocks[i];

                    // If block is not the current one and is not closed (closed means not attached to DOM)
                    if (otherblock == this.block || otherblock.isClosed) continue;

                    // If block is close enough on axe Y to be a constraint on axe X
                    if (otherblock.currentPosition.to.y > (yFrom - this.options.snapStrength) && otherblock.currentPosition.from.y < (yTo + this.options.snapStrength)) {
                        edgesOnX.push(otherblock.currentPosition.from.x);
                        edgesOnX.push(otherblock.currentPosition.to.x);
                    }

                    // If block is close enough on axe X to be a constraint on axe Y
                    if (otherblock.currentPosition.to.x > (xFrom - this.options.snapStrength) && otherblock.currentPosition.from.x < (xTo + this.options.snapStrength)) {
                        edgesOnY.push(otherblock.currentPosition.from.y);
                        edgesOnY.push(otherblock.currentPosition.to.y);
                    }

                }

                // For each edge found on X axis, calculate and apply the magnetism if so
                for (let edgeOnX of edgesOnX) {
                    if (Math.abs(xTo - edgeOnX) < this.options.snapStrength) {
                        xTo = edgeOnX;
                        xFrom = xTo - this.block.targetPosition.size.x;
                        isRightSnapped = true;
                    }
                    if (Math.abs(xFrom - edgeOnX) < this.options.snapStrength) {
                        xFrom = edgeOnX;
                        xTo = xFrom + this.block.targetPosition.size.x;
                        isLeftSnapped = true;
                    }
                }

                // For each edge found on Y axis, calculate and apply the magnetism if so
                for (let edgeOnY of edgesOnY) {
                    if (Math.abs(yTo - edgeOnY) < this.options.snapStrength) {
                        yTo = edgeOnY;
                        yFrom = yTo - this.block.targetPosition.size.y;
                        isBottomSnapped = true;
                    }
                    if (Math.abs(yFrom - edgeOnY) < this.options.snapStrength) {
                        yFrom = edgeOnY;
                        yTo = yFrom + this.block.targetPosition.size.y;
                        isTopSnapped = true;
                    }
                }
            }

            // Finally assign new calculated position as target (not current position, because this.reposition() is responsible for making lerp animation)
            this.block.targetPosition.to.x = xTo;
            this.block.targetPosition.to.y = yTo;
            this.block.targetPosition.from.x = xFrom;
            this.block.targetPosition.from.y = yFrom;

            this.block.observer.$emit(BlockLayout.EVENTS.BLOCK_MOVE);

            if (this.block.node) {
                this.block.node.classList.toggle("resizing-right", isRightSnapped);
                this.block.node.classList.toggle("resizing-left", isLeftSnapped);
                this.block.node.classList.toggle("resizing-top", isTopSnapped);
                this.block.node.classList.toggle("resizing-bottom", isBottomSnapped);
            }
        }

    }

    movableMouseUp() {
        if (this.block.node) {
            this.block.node.classList.toggle("resizing-right", false);
            this.block.node.classList.toggle("resizing-left", false);
            this.block.node.classList.toggle("resizing-top", false);
            this.block.node.classList.toggle("resizing-bottom", false);
            this.block.node.classList.toggle("moving", false);
        }
        document.documentElement.removeEventListener("mousemove", this.movableMouseMove);
        document.documentElement.removeEventListener("mouseup", this.movableMouseUp);
    }

    getDirections(movingSide) {
        let origins = {
            "right": {
                from: "to",
                opposite: "from",
                mainAxe: "x",
                crossAxe: "y"
            },
            "left": {
                from: "from",
                opposite: "to",
                mainAxe: "x",
                crossAxe: "y"
            },
            "bottom": {
                from: "to",
                opposite: "from",
                mainAxe: "y",
                crossAxe: "x"
            },
            "top": {
                from: "from",
                opposite: "to",
                mainAxe: "y",
                crossAxe: "x"
            },
        };

        // Les variables à utiliser
        return {
            mainAxe: origins[movingSide].mainAxe,
            crossAxe: origins[movingSide].crossAxe,
            from: origins[movingSide].from,
            oppositeFrom: origins[movingSide].opposite,
        };
    }

    createResizer(movingSide) {

        // If node exists to the DOM
        if (this.block?.node) {

            // Create and element to DOM
            let resizer = document.createElement("div");
            resizer.classList.toggle("resizer", true);
            resizer.classList.toggle("resizer-" + movingSide, true);
            this.block.node.appendChild(resizer);

            // Handle the resizing when click is down
            resizer.addEventListener("mousedown", this.resizableMouseDown);
            resizer.setAttribute("moving-side", movingSide);
        }
    }

}

export default Interact;
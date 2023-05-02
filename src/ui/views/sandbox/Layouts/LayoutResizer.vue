<template>
    <div
        ref="layout-resizer"
        class="layout-resizer"
        :class="{ vertical, active }"
        @mousedown.stop="onMouseDown"
        @mouseup.stop="onMouseUp"
    ></div>
</template>
<script>
import MathUtils from '@/engine/utils/MathUtils';

export default {
    props: {
        vertical: {
            type: Boolean,
            default: false,
        }
    },
    data() {
        return {
            active: false,
            siblingPrev: null,
            siblingNext: null,
            boundingBox: null,
            prevBoundingBox: null,
            nextboundingBox: null,
            initialMousePosition: {
                x: 0,
                y: 0
            },
            closestParent: null
        };
    },
    methods: {
        onMouseDown(e) {

            this.active = true;
            document.body.addEventListener("pointermove", this.onMouseMove);
            document.body.addEventListener("mouseup", this.onMouseUp);

            document.body.classList.toggle("resize-" + (this.vertical ? "y" : "x"), true);

            this.siblingPrev = e.target.previousElementSibling;
            this.siblingNext = e.target.nextElementSibling;
            this.prevBoundingBox = this.siblingPrev.getBoundingClientRect();
            this.nextBoundingBox = this.siblingNext.getBoundingClientRect();

            this.boundingBox = new DOMRect(
                this.prevBoundingBox.x,
                this.prevBoundingBox.y,
                this.nextBoundingBox.right - this.prevBoundingBox.x,
                this.nextBoundingBox.bottom - this.prevBoundingBox.y
            );

            this.initialMousePosition = {
                x: e.clientX,
                y: e.clientY
            };

        },
        onMouseUp(e) {
            this.active = false;
            document.body.classList.toggle("resize-" + (this.vertical ? "y" : "x"), false);
            document.body.removeEventListener("pointermove", this.onMouseMove);
            document.body.removeEventListener("mouseup", this.onMouseUp);
        },
        onMouseMove(e) {
            let translateAxe = this.vertical ? "translateY" : "translateX";
            let mousePos = this.vertical ? e.clientY : e.clientX;
            let initPos = this.vertical ? this.initialMousePosition.y : this.initialMousePosition.x;
            let min = this.vertical ? -this.prevBoundingBox.height : -this.prevBoundingBox.width;
            let max = this.vertical ? this.nextBoundingBox.height : this.nextBoundingBox.width;
            let newPos = MathUtils.clamp(mousePos - initPos, min, max);

            let flexGrow = MathUtils.mapRange(
                newPos,
                min, max,
                0, 2
            );

            this.siblingPrev.style.flexGrow = flexGrow;
            this.siblingNext.style.flexGrow = 2 - flexGrow;
        },

    }
};
</script>
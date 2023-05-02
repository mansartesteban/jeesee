<template>
  <LayoutBox
    :items="transformedLayout"
    @dragStart="onMouseDown"
    @dragMove="onMouseMove"
    @dragEnd="onMouseUp"
  ></LayoutBox>

  <div
    ref="slot-ghost"
    class="slot-ghost ghost"
  ></div>
  <div
    ref="box-ghost"
    class="box-ghost ghost"
  ></div>
</template>

<script>

/*

TODO:
- Increase resizer click area size
- Add glowing effect to resizers
- Add snapping to borders on resize
- Add the possibility to rename panels
- Create a function 'simplifyLayout' which loops through layout and simplify tree to avoid useless containers or emptied box
- Contextual menu : split view, close others, pin, show children
- Add tab system


Find a solution to handle contextual boxes, as exemple, the ContextBar has as component for the list of entities,
the transform modifiers and component modifiers. But those boxes could only be place in ContextBar.
Maybe we could add a slug to boxes so they can be identified as mandatory parent of those sub-boxes ?
As well, find a solution to initialize those sub-boxes 


FIXME:
- When dragging boxes next to main boxes (first deepness level), box disappear
- Sometimes an error in thrown with "reading 'style' of undefined"
- When moving a box, move its children with it
- When moving box on itself, don't allow to move
- The collapse doesn't work anymore
*/


// Exemple : http://jsfiddle.net/Lnem9d8g/

import LayoutBox from "./LayoutBox";
import Layout from "./Layout";

export default {
  name: "Layout",

  data() {
    return {
      movingElementBoundingBox: null,
      movingElementId: null,
      deltaMoving: null,
      movingBox: null,
      slots: [],
    };
  },
  computed: {
    transformedLayout() {
      return Layout.layout.reduce((transformedLayout, box) => {
        return Layout.placeOrCreateNode(transformedLayout, box, [], box.id.split("-"));
      }, []);
    },
  },
  methods: {

    intersectBoundingBox(boundingBox, x, y) {
      return x && y && x >= boundingBox.left && x <= boundingBox.right && y >= boundingBox.top && y <= boundingBox.bottom;
    },

    setBoundingBox(element, boundingBox, originX = 0, originY = 0) {
      if (boundingBox && element) {
        if (element instanceof HTMLElement) {
          if (boundingBox instanceof HTMLElement) {
            boundingBox = boundingBox.getBoundingClientRect();
          }

          element.style.transform = `translate(${originX + boundingBox.left}px, ${originY + boundingBox.top}px)`;
          element.style.width = boundingBox.width + "px";
          element.style.height = boundingBox.height + "px";

        }
      }
    },

    onMouseMove(e) {

      this.movingElementBoundingBox.x = e.clientX - this.deltaMoving.x;
      this.movingElementBoundingBox.y = e.clientY - this.deltaMoving.y;
      this.setBoundingBox(this.$refs["box-ghost"], this.movingElementBoundingBox, 99999, 99999);

      this.closestParent = e.target.closest(".layout-box");

      if (this.closestParent) {

        this.slots = Layout.createSlots(
          this.closestParent.getBoundingClientRect(),
          this.closestParent.getAttribute("data-id") === this.movingElementId
        );

        let intersected = false;

        if (this.closestParent) {
          for (let slot of this.slots) {
            let intersect = this.intersectBoundingBox(slot.boundingBox, e.clientX, e.clientY);
            slot.hovered = intersect;
            if (intersect && !intersected) {
              intersected = true;
              this.setBoundingBox(this.$refs["slot-ghost"], slot.boundingBox, 99999, 99999);
            }
          }
        }
      }

    },

    onMouseUp() {

      this.$refs["slot-ghost"].style.transform = "unset";
      this.$refs["box-ghost"].style.transform = "unset";

      if (this.movingElementId) {

        let slotHovered = this.slots.find(slot => slot.hovered);
        if (slotHovered) {

          let slotId = this.closestParent.getAttribute("data-id"); // ID of current hovered box
          let isVertical = slotId.split("-").length % 2;
          let foundElement = Layout.layout.find(box => box.id === this.movingElementId);

          if (slotId !== this.movingElementId) {
            Layout.moveSlot(slotHovered, foundElement, slotId, isVertical);
          }
        }
      } else {
        this.movingElementId = null;
      }

    },

    onMouseDown(e, movingElementId) {
      this.movingElementId = movingElementId;

      let newClosestParent = e.target.closest(".layout-box");
      this.movingElementBoundingBox = newClosestParent.getBoundingClientRect();
      this.movingBox = newClosestParent;
      this.deltaMoving = {
        x: e.clientX - this.movingElementBoundingBox.x,
        y: e.clientY - this.movingElementBoundingBox.y,
      };

    }
  }

};

</script>
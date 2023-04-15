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
OK - Have the possibility to add flex-grow in main array (to prepare data saving and retrieving)
OK - BTW pass the grow as prop of layout-box, like this we could read/save the grow easily
OK - Add the cursor class on the body while resizing
OK - Add a header slot on layout-box
OK - Add toolbar in header with predefined actions (close, expand/collapse, max/minimize, options)
OK - Add the possibility to locate slot (to prepare the drag-n-drop feature)
OK - Add lerp transitions 
OK - Try to remove the header on main layout-box (because there is no data linked to it)
OK - Handle the drag-n-drop by dragging on header 
OK - Add the possibility to move a block into another
OK - Fix the borders collapsing sizes
OK - When an element is moved, we can't move it anymore
OK - When we add a wrapper to box, don't make header

TODO:
- Increase resizer click area size
- Add glowing effect to resizers
- Add snapping to borders on resize
- Add the possibility to rename panels
- Create a function 'simplifyLayout' which loops through layout and simplify tree to avoid useless containers or emptied box
- Contextual menu : split view, close others, pin
- Add tab system

FIXME:
- When dragging boxes next to main boxes (first deepness level), box disappear
- Sometimes an error in thrown with "reading 'style' of undefined"
- When moving a box, move its children with it
- When moving box on itself, don't allow to move
- The collapse doesn't work anymore
*/


// Exemple : http://jsfiddle.net/Lnem9d8g/

import LayoutBox from "./LayoutBox";
import { defaultLayout as LayoutDatas } from "./Layouts";
import { createSlots, moveInside, moveNextDeeperLevel, moveNextSameLevel, movePreviousDeeperLevel, movePreviousSameLevel } from "./LayoutHelper";

export default {
  name: "Layout",

  data() {
    return {
      layouts: LayoutDatas,
      movingElementBoundingBox: null,
      movingElementId: null,
      deltaMoving: null,
      movingBox: null,
      slots: [],
    };
  },
  computed: {
    transformedLayout() {
      return this.layouts.reduce((transformedLayout, box) => {
        return this.placeOrCreateNode(transformedLayout, box, [], box.id.split("-"));
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


    placeOrCreateNode(array = [], box, previousSplittedKeys, splittedKeys) {
      if (!array[splittedKeys[0]]) {
        array[splittedKeys[0]] = {
          id: [...previousSplittedKeys, splittedKeys[0]].join("-"),
          type: "container",
          boxes: []
        };
      }

      if (splittedKeys.length > 1) {
        array[splittedKeys[0]].boxes = this.placeOrCreateNode(array[splittedKeys[0]].boxes, box, [splittedKeys[0], ...previousSplittedKeys], splittedKeys.slice(1));
      } else {
        array[splittedKeys[0]] = { ...array[splittedKeys[0]], ...box };
      }

      return array;
    },

    onMouseMove(e) {

      this.movingElementBoundingBox.x = e.clientX - this.deltaMoving.x;
      this.movingElementBoundingBox.y = e.clientY - this.deltaMoving.y;
      this.setBoundingBox(this.$refs["box-ghost"], this.movingElementBoundingBox, 99999, 99999);

      this.closestParent = e.target.closest(".layout-box");

      if (this.closestParent) {

        this.slots = createSlots(
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
          let foundElement = this.layouts.find(box => box.id === this.movingElementId);
          let parentBox = this.layouts.find(box => box.id === slotId);

          if (slotId !== this.movingElementId) {
            if (foundElement) {

              if (slotHovered.name === "center") {
                moveInside(foundElement, slotId);
              }

              // If we have to add previous on the same deepness
              else if (slotHovered.name === "left" && !isVertical || slotHovered.name === "top" && isVertical) {
                movePreviousSameLevel(foundElement, slotId, this.layouts);
              }

              // If we have to add previous on the next deeper level
              else if (slotHovered.name === "left" && isVertical || slotHovered.name === "top" && !isVertical) {
                movePreviousDeeperLevel(foundElement, slotId, parentBox);
              }

              // If we have to add next on the same deepness
              else if (slotHovered.name === "right" && !isVertical || slotHovered.name === "bottom" && isVertical) {
                moveNextSameLevel(foundElement, slotId, this.layouts);
              }

              // If we have to add next on the next deeper level
              else if (slotHovered.name === "right" && isVertical || slotHovered.name === "bottom" && !isVertical) {
                moveNextDeeperLevel(foundElement, slotId, parentBox);
              }
            }
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
  },

};

</script>
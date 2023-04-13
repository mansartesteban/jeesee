<template>
  <LayoutBox :items="layouts"></LayoutBox>
  <div
    ref="slot-ghost"
    class="slot-ghost"
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

TODO:
- Increase resizer click area size
- Handle the drag-n-drop by dragging on header 
- Add the possibility to move a block into another
- Add glowing effect to resizers
- Add snapping to borders on resize
- Add the possibility to rename panels
*/


// Exemple : http://jsfiddle.net/Lnem9d8g/

import LayoutBox from "./LayoutBox";
import { layoutData2 as LayoutDatas } from "./Layouts";

export default {
  name: "Layout",
  data() {
    return {
      layouts: LayoutDatas,
      slots: []
    };
  },
  methods: {
    async move(e) {
      let newClosestParent = e.target.closest(".layout-box");

      if (!this.closestParent) {
        this.closestParent = newClosestParent;
      }

      if (this.closestParent && this.closestParent !== newClosestParent) {
        this.closestParent.style.background = "none";
        this.closestParent = newClosestParent;
        newClosestParent.style.background = "rgba(255, 0, 0, .25)";

        let boundingBox = newClosestParent.getBoundingClientRect();

        this.slots = [
          // left
          // if vertical => wrap in a layout-box and place first
          // if horizontal => place before on same level
          new DOMRect(boundingBox.left, boundingBox.top, boundingBox.width * .25, boundingBox.height),

          // right
          // if vertical => wrap in a layout-box and place next
          // if horizontal => place after on same level
          new DOMRect(boundingBox.right - boundingBox.width * .25, boundingBox.top, boundingBox.width * .25, boundingBox.height),

          // top
          // if vertical => place before on same level
          // if horizontal => wrap in a layout-box and place first
          new DOMRect(boundingBox.left, boundingBox.top, boundingBox.width, boundingBox.height * .25),

          // bottom
          // if vertical => place after on same level
          // if horizontal => wrap in a layout-box and place next
          new DOMRect(boundingBox.left, boundingBox.top + boundingBox.height * .75, boundingBox.width, boundingBox.height * .25),

          // center
          // add to item.boxes 
          boundingBox
        ];
      }

      if (this.closestParent) {
        let x = e.clientX;
        let y = e.clientY;
        for (let slot of this.slots) {
          if (this.intersectBoundingBox(slot, x, y)) {
            this.setBoundingBox(this.$refs["slot-ghost"], slot);
            console.log(this.closestParent.getAttribute("data-id"));
            break;
          }
        }
      }
    },
    intersectBoundingBox(boundingBox, x, y) {
      return x && y && x >= boundingBox.left && x <= boundingBox.right && y >= boundingBox.top && y <= boundingBox.bottom;
    },
    setBoundingBox(element, boundingBox) {
      if (boundingBox && element) {
        if (element instanceof HTMLElement) {
          if (boundingBox instanceof HTMLElement) {
            boundingBox = boundingBox.getBoundingClientRect();
          }

          element.style.left = boundingBox.left + "px";
          element.style.right = (window.innerWidth - boundingBox.right) + "px";
          element.style.top = boundingBox.top + "px";
          element.style.bottom = (window.innerHeight - boundingBox.bottom) + "px";

        }
      }
    },
    bindId(item, prefix = "") {
      item.forEach((box, key) => {
        if (box.isBox) {
          if (box.id === undefined) {
            box.id = (prefix ? prefix + "-" : "") + key;
          }
          box.boxes && this.bindId(box.boxes, box.id);
        }
      });
    },
  },
  mounted() {
    document.body.addEventListener("pointermove", this.move);

    this.bindId(this.layouts);
    console.log(this.layouts);

  },
};

</script>

<style lang="scss" scoped>
@import "@styles/vars";
.slot-ghost {
  position: absolute;
  background: rgba($primary, .5);
  pointer-events: none;
  transition: all $transitionDurationFast $transitionTimingDefault;
}
</style>
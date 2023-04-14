<template>
  <!-- <LayoutBox
    :items="layouts"
    @select="prepareMoving"
  ></LayoutBox> -->
  <pre class="language-json">{{ transformedLayout }}</pre>
  <pre class="language-json">
  {
    "isBox": true,
    "id": "0",
    {
      boxes: [
        {
          "isBox": true,
          "title": "Panel 1",
          "flex": 1,
          "id": "0-1"
        }
      ]
    }
  }
  </pre>
  <div
    ref="slot-ghost"
    class="slot-ghost"
  ></div>
</template>

<script>
import "vue-code-highlight/themes/window.css";
import "vue-code-highlight/themes/prism.css";

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
import { layoutData3 as LayoutDatas } from "./Layouts";

export default {
  name: "Layout",
  data() {
    return {
      layouts: LayoutDatas,
      slots: [],
    };
  },
  computed: {
    transformedLayout() {

      let keys = this.layouts.map(box => box.id);

      return keys.reduce((newArray, keyPath) => {

        console.log("reducing main paths", keyPath);
        console.log("value on each reduce", JSON.parse(JSON.stringify(newArray)));

        keyPath.split("-").reduce((nestedArray, key, index, mainKeyPathsArray) => {

          console.log("value on begin nested", JSON.parse(JSON.stringify(nestedArray)));
          console.log("reducing key path", key);

          if (mainKeyPathsArray[index + 1] !== undefined) {

            console.log("has a next", mainKeyPathsArray[index + 1]);

            if (nestedArray.boxes === undefined) {
              nestedArray.boxes = [];
            }

            if (nestedArray.boxes[key] === undefined) {
              console.log(`nested array '${key}' doesn't exists`);
              nestedArray.boxes[key] = { boxes: [] };
            }

            console.log("returning nested", JSON.parse(JSON.stringify(nestedArray[key])));
            return nestedArray.boxes[key];

          } else {

            nestedArray[key] = this.layouts.find(box => box.id === keyPath);
            console.log("doesn't have next, returning value " + keyPath, JSON.parse(JSON.stringify(nestedArray)));
            return nestedArray;

          }

        }, newArray);

        return newArray;

      }, []);

      // return keys.reduce((r, k) => {

      //   console.log("reducing k", k);

      //   k.split('-').reduce((a, e, i, arr) => {
      //     console.log("splitted keys", a, e);
      //     const next = arr[i + 1];
      //     console.log("next", next);
      //     if (!next) {
      //       // let ret = a[e] = this.layouts.find(box => box.id === k);
      //       let ret = (a[e] = k);
      //       console.log("ret if", ret);
      //       return ret;
      //     }
      //     else {
      //       console.log("before a[e]", a[e], a, e);
      //       let ret = a[e] || (a[e] = []);
      //       console.log("ret else", ret);
      //       return ret;
      //     }
      //   }, r);

      //   console.log("reduced ", r);

      //   return r;
      // }, []);

      // return keys.reduce((reducer, key) => {
      //   console.log("reducing on " + key);

      // const splittedPositions = key.split("-");
      // let newArray = [];

      // splittedPositions.forEach((keyPosition, i) => {

      //   const next = splittedPositions[i + 1];
      //   if (next) {
      //     return newArray[keyPosition] || (newArray[keyPosition] = []);
      //   } else {
      //     return newArray[keyPosition] = this.layouts.find(box => box.id === key);
      //   }

      // })



      // }, []);
    }
    // let maxDeepness = this.layouts.reduce((max, box) => Math.max(max, box.id.split("-").length), 0);
    // console.log(maxDeepness);
    // return this.transformLayout(1, maxDeepness);
  },
  methods: {
    // transformLayout(deepness = 1, maxDeepness = 1) {
    //   // console.log("deepnes?", deepness);
    //   let boxForCurrentDeepness = this.layouts.filter(layoutBox => {
    //     // console.log(layoutBox.id, layoutBox.id.split("-"), layoutBox.id.split("-").length, deepness, layoutBox.id.split("-").length === deepness);
    //     return layoutBox.id.split("-").length === deepness;
    //   });
    //   // console.log("boxForCurrentDeepness", boxForCurrentDeepness);
    //   return boxForCurrentDeepness.map(currentBox => {
    //     currentBox.boxes = this.layouts.filter(layoutBox => {
    //       if (layoutBox.id !== currentBox.id && layoutBox.id.startsWith(currentBox.id) && layoutBox.id.split("-").length === deepness + 1) {
    //         if (deepness <= maxDeepness) {

    //         }
    //         return true;
    //       }
    //       return false;
    //     });
    //   });
    // },
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

        // Todo : Add a slot for tab container 
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
    prepareMoving(e) {
      console.log("prepare moving", e);
    }
  },
  mounted() {
    document.addEventListener("click", () => {

    });
    document.body.addEventListener("pointermove", this.move);

    this.bindId(this.layouts);

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
<template>
  <div class="main-layout d-flex flex flex-column flex-nowrap">

    <LayoutBox :items="layouts"></LayoutBox>

  </div>


  <div
    id="debug"
    class="debug"
  ></div>

  <div
    id="debugNext"
    class="debugNext"
  ></div>

  <div
    id="debugPrev"
    class="debugPrev"
  ></div>
</template>

<script>

/*
TODO:
- Have the possibility to add flex-grow in main array (to prepare data saving and retrieving)
  - BTW pass the grow as prop of layout-box, like this we could read/save the grow easily
- Increase resizer click area size
- Add the cursor class on the body while resizing
- Add the possibility to locate slot (to prepare the drag-n-drop feature)
- Add a header slot on layout-box to handle the drag-n-drop 
- Add the possibility to move a block into another
- Add toolbar in header with predefined actions (close, expand/collapse, max/minimize, options)
- Add lerp transitions 
- Add glowing effect to resizers
- Add snapping to borders on resize
*/


// Exemple : http://jsfiddle.net/Lnem9d8g/

import Checkbox from '@/ui/components/inputs/Checkbox.vue';
import LayoutBox from './LayoutBox';
import { h } from 'vue';

export default {
  name: "Layout",

  data() {
    return {
      layouts: [],
    };
  },
  methods: {

  },
  mounted(props, ctx) {


    this.layouts = [
      [
        // row
        [
          // col
          Checkbox
        ],
        [
          // col
          [
            // row
            Checkbox,
            [
              //col
              //row
              Checkbox,
              Checkbox,
              Checkbox,
              Checkbox,
              Checkbox
            ],
            [
              Checkbox,
              Checkbox,
              Checkbox,
            ],
          ],
          // col
          [
            // row
            [
              //col
              //row
              [Checkbox,
                Checkbox],
              Checkbox,
              Checkbox,
              Checkbox,
              Checkbox
            ],
            [
              Checkbox,
              Checkbox,
              Checkbox,
            ],
          ],

          [
            // row
            [
              //col
              //row
              Checkbox,
              Checkbox,
              Checkbox,
              Checkbox,
              Checkbox,
              Checkbox
            ],
            [
              Checkbox,
              Checkbox,
              Checkbox,
            ],
          ],
          [
            // row
            [
              //col
              //row
              Checkbox,
              Checkbox,
              Checkbox,
              Checkbox,
              Checkbox,
              Checkbox
            ],
            [
              Checkbox,
              Checkbox,
              Checkbox,
            ],
          ],
        ],
      ],
      [
        // row
        [
          // col
          Checkbox
        ],
        [
          // col
          [
            // row
            [
              //col
              //row
              Checkbox,
              Checkbox,
              Checkbox,
              Checkbox,
              Checkbox,
              Checkbox
            ],
            [
              Checkbox,
              Checkbox,
              Checkbox,
            ],
          ],

          [
            // row
            [
              //col
              //row
              Checkbox,
              Checkbox,
              Checkbox,
              Checkbox,
              Checkbox,
              Checkbox
            ],
            [
              Checkbox,
              Checkbox,
              Checkbox,
            ],
          ],
          [
            // row
            [
              //col
              //row
              Checkbox,
              Checkbox,
              Checkbox,
              Checkbox,
              Checkbox,
              Checkbox
            ],
            [
              Checkbox,
              Checkbox,
              Checkbox,
            ],
          ],
        ],
      ],
    ];

  },
};

function createLayout(items, lvl = 0) {
  items.forEach(item => {
    if (Array.isArray(item)) {
      console.log("toto");
    }
  });
}

</script>

<style scoped>
.debug {
  position: absolute;
  background: rgba(255, 0, 255, .5);
  border: 2px dotted rgba(255, 0, 0, .25);
}

.debugNext {
  position: absolute;
  background: rgba(0, 68, 255, 0.2);
  border: 2px dotted rgba(0, 72, 255, 1);
}

.debugPrev {
  position: absolute;
  background: rgba(183, 255, 0, 0.2);
  border: 2px dotted rgba(200, 255, 0, 1);
}
</style>

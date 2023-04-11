<template>
  <div class="main-layout">
    <slot></slot>
    <LayoutBox class="row">
      <LayoutBox class="col"></LayoutBox>
      <LayoutBox class="col"></LayoutBox>
      <LayoutBox class="tab"></LayoutBox>
      <LayoutBox class="tab"></LayoutBox>
    </LayoutBox>
    <LayoutBox class="row">
      <LayoutBox class="col">
        <LayoutBox class="row">
          <LayoutBox class="col"></LayoutBox>
          <LayoutBox class="col"></LayoutBox>
          <LayoutBox class="tab"></LayoutBox>
          <LayoutBox class="tab"></LayoutBox>
        </LayoutBox>
        <LayoutBox class="row">
          <LayoutBox class="col"></LayoutBox>
          <LayoutBox class="col"></LayoutBox>
          <LayoutBox class="tab"></LayoutBox>
          <LayoutBox class="tab"></LayoutBox>
        </LayoutBox>
      </LayoutBox>
      <LayoutBox class="col"></LayoutBox>
      <LayoutBox class="tab"></LayoutBox>
      <LayoutBox class="tab"></LayoutBox>
    </LayoutBox>
    <LayoutBox class="row">
      <LayoutBox class="col"></LayoutBox>
      <LayoutBox class="col"></LayoutBox>
      <LayoutBox class="tab"></LayoutBox>
      <LayoutBox class="tab"></LayoutBox>
    </LayoutBox>
  </div>
</template>

<script>
import Checkbox from '@/ui/components/inputs/Checkbox.vue';
import LayoutBox from './LayoutBox';
import { h } from 'vue'

export default {
  name: "Layout",
  data() {
    return {
      layout: [],
    };
  },
  methods: {
    
  },
  setup(props, ctx) {

    
    const layout = [
      [
        // row
        [
          // col
          Checkbox
        ],
        [
          // row
          [
            // col
            [
              //row
              [
                //col
                Checkbox,
                Checkbox,
                Checkbox
              ],
              [
                //col
                Checkbox,
                Checkbox,
                Checkbox
              ],
            ],
            [
              //row
              [
                //col
                Checkbox,
                Checkbox,
                Checkbox,
              ],
              [
                //col
                Checkbox,
                Checkbox,
                Checkbox,
              ],
            ],
          ],
        ],
      ],
    ];

    // let l = ctx.methods.createLayout(layout);

    return () => h(LayoutBox, createLayout([Checkbox]))
  },
};

function createLayout(items, lvl = 0) {
    items.forEach(item => {
      if (Array.isArray(item)) {
        console.log("toto")
      }
    })
}
    
</script>

<style>
.layout-box {
  display: flex;
  flex: 1;
  flex-wrap: nowrap;
}
.layout-box.col {
  flex-direction: column;
}
.layout-box.row {
  flex-direction: row;
}
</style>

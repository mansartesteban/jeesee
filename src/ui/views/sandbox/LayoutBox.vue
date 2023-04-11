<template>
  <template v-for="(item, k) in items">
    <LayoutResizer
      v-if="item.length > 1 && k !== 0"
      :neighbours="item.length"
      :vertical="!vertical"
    ></LayoutResizer>
    <div
      class="layout-box d-flex flex-nowrap"
      :class="vertical ? 'flex-column' : 'flex-row'"
      style="flex-grow: 1"
    >
      <LayoutBox
        v-if="Array.isArray(item)"
        :items=item
        :vertical="!vertical"
      ></LayoutBox>
      <Component
        v-else
        :is="item"
      ></Component>
    </div>
  </template>
</template>
<script>
export default {
  props: {
    items: {
      type: [Array, Object],
    },
    vertical: {
      type: Boolean,
      default: false
    }
  }
};
</script>
<style scoped>
.layout-box {
  overflow: auto;
}

.layout-box.flex-column {
  flex: 1;
  /* border: 2px dotted coral; */
}

.layout-box.flex-row {
  flex: 1;
  /* border: 2px dotted cornflowerblue; */
}
</style>
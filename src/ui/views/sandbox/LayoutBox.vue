<template>
  <div
    class="layout-box d-flex flex-nowrap flex-column"
    :data-id="id"
  >
    <div
      v-if="childBox"
      class="layout-box-header d-flex flex-nowrap flex-row"
      @click="$emit('select', id)"
    >
      <Toolbar class="flex">
        {{ title }}
        <div class="flex"></div>
        {{ id }}
        <div class="flex"></div>
        <Button
          xs
          :icon="isCollapsed ? 'chevron-down' : 'chevron-up'"
          @click="isCollapsed = !isCollapsed"
        ></Button>
        <Button
          xs
          icon="x"
          @click="closeBox"
        ></Button>
      </Toolbar>
    </div>
    <div
      class="layout-box-body d-flex flex-nowrap"
      :class="vertical ? 'flex-column' : 'flex-row'"
      :style="isCollapsed ? 'flex-grow: 0' : 'flex-grow: 1'"
    >
      <template v-for="(item, k) in items">
        <LayoutResizer
          v-if="item.isBox && k !== 0"
          :neighbours="item.length"
          :vertical="vertical"
        ></LayoutResizer>
        <LayoutBox
          v-if="item.isBox && item.boxes"
          child-box
          :items="item.boxes"
          :vertical="!vertical"
          :flex="item.flex"
          :title="item.title"
          :id="item.id"
          v-model:collapsed="item.collapsed"
          @select="$emit('select', $event)"
        ></LayoutBox>
        <Component
          v-else
          :is="item"
        ></Component>
      </template>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    childBox: {
      type: Boolean,
      default: false
    },
    items: {
      type: [Array, Object],
    },
    id: {
      type: String,
      default: ""
    },
    title: {
      type: String,
      default: ""
    },
    vertical: {
      type: Boolean,
      default: true
    },
    flex: {
      type: Number,
      default: 1
    },
    collapsed: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    isCollapsed: {
      get() { return this.collapsed; },
      set(val) {
        this.$emit("update:collapsed", val);
      }
    }
  },
  methods: {
    closeBox() {

    }
  }
};
</script>
<style scoped lang="scss">
.layout-box {
  flex: 1;
  overflow: auto;
  border: 1px solid var(--secondary-color);
  padding: .5em;
  
  .layout-box-header {
    border: 1px dotted yellow;
    padding: .5em;
  }

  .layout-box-body {

    padding: .5em;
    
    &.flex-column {
      border: 1px dotted coral;
    }

    &.flex-row {
      border: 1px dotted cornflowerblue;
    }

  }
}


</style>
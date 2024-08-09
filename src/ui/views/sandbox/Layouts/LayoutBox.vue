<template>
  <div
    class="layout-box d-flex flex-nowrap flex-column"
    :data-id="id"
    :style="{ flex }"
  >
    <div
      v-if="type === 'box'"
      class="layout-box-header d-flex flex-nowrap flex-row"
      @mousedown.stop="dragStart"
    >
      <Toolbar class="px-2">
        <span
          class="text-ellipsis"
          @dblclick.stop=""
        >
          {{ title }}
        </span>
        <div class="flex"></div>
        <Button
          xs
          :icon="isCollapsed ? 'chevron-down' : 'chevron-up'"
          @click.stop="isCollapsed = !isCollapsed"
        ></Button>
        <Button
          xs
          icon="x"
          @click.stop="closeBox"
          v-if="closable"
        ></Button>
      </Toolbar>
    </div>
    <div
      class="layout-box-body d-flex flex-nowrap"
      :class="vertical ? 'flex-column' : 'flex-row'"
      :style="isCollapsed ? 'flex-grow: 0' : 'flex-grow: 1'"
    >

      <template v-for="(item, k) in items.filter(a => a)">

        <LayoutResizer
          v-if="item && ['container', 'box'].includes(item.type) && k !== 0"
          :neighbours="item.length"
          :vertical="vertical"
        ></LayoutResizer>
        <LayoutBox
          v-bind="item"
          :items="item.boxes"
          :vertical="!vertical"
          v-model:collapsed="item.collapsed"
          @dragStart="(e, id) => $emit('dragStart', e, id)"
          @dragMove="$emit('dragMove', $event)"
          @dragEnd="$emit('dragEnd')"
        >
          <Component
            v-if="item?.content"
            :is="item.content"
          ></Component>
        </LayoutBox>

      </template>

      <slot></slot>

    </div>
  </div>
</template>
<script>

import SceneView from "@/ui/views/engine/SceneView.vue";
import BottomBar from "@/ui/views/engine/BottomBar.vue";
import SideBar from "@/ui/views/engine/SideBar.vue";
import ContextBar from "@/ui/views/engine/ContextBar.vue";

export default {
  components: {
    SceneView,
    BottomBar,
    SideBar,
    ContextBar,
  },
  props: {
    items: {
      type: [Array, Object],
    },
    id: {
      type: String,
      default: ""
    },
    type: {
      type: String,
      default: "container"
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
      type: [Number, String],
      default: 1
    },
    collapsed: {
      type: Boolean,
      default: false
    },
    closable: {
      type: Boolean,
      default: true
    },
    content: {
      type: String,
      default: ""
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

    dragStart(e) {
      this.$emit('dragStart', e, this.id);

      document.body.addEventListener("pointermove", this.dragMove);
      document.body.addEventListener("mouseup", this.dragEnd);

      document.body.style.userSelect = "none";
    },
    dragMove(e) {
      this.$emit("dragMove", e);
    },
    dragEnd() {
      this.$emit("dragEnd");

      document.body.removeEventListener("pointermove", this.dragMove);
      document.body.removeEventListener("mouseup", this.dragEnd);

      document.body.style.userSelect = "";
    },
    closeBox() {

    }
  },
  beforeUnmount() {
    document.body.removeEventListener("pointermove", this.dragMove);
    document.body.removeEventListener("mouseup", this.dragEnd);
  }
};
</script>
<style scoped lang="scss">
.layout-box
{
  flex: 1;
  border: 2px solid var(--secondary-color);
  margin: -2px;
  overflow: hidden;

  .layout-box-header
  {
    border-bottom: 2px solid var(--secondary-color);
    margin: -2px;
  }

}
</style>
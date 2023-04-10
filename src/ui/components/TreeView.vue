<template>
    <div class="tree-view flex">
        <div
            v-for="(item, key) in items"
            class="d-flex flex-column"
        >
            <div
                class="tree-view-row d-flex flex-nowrap align-items-center px-2 py-1"
                @click="onRowClick(key)"
            >
                <i
                    class="bi me-4"
                    :class="`bi-${item.icon}`"
                ></i>
                <span class="text-ellipsis">{{ item.label }}</span>
                <slot
                    name="next-to-label"
                    v-bind="{ item, key }"
                ></slot>
                <div class="flex"></div>
                <i
                    v-if="item.items"
                    class="bi"
                    :class="childExpanded[key] ? 'bi-caret-up' : 'bi-caret-down'"
                ></i>
                <slot
                    name="item-end"
                    v-bind="{ item, key }"
                ></slot>
            </div>
            <div
                v-if="item.items"
                class="sub-tree-view d-flex mw-4"
                :class="{ expanded: childExpanded[key] }"
            >
                <TreeView :items="item.items"></TreeView>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        items: Array,

    },
    data() {
        return {
            childExpanded: []
        };
    },
    methods: {
        onRowClick(key) {
            this.childExpanded[key] = !this.childExpanded[key];
            this.$emit("row-clicked", this.items[key], key);
        }
    },
    created() {
        this.items.forEach((item, key) => {
            this.childExpanded.push(false);
        });
    }
};
</script>

<style lang="scss" scoped>

@import "@styles/vars";

.tree-view-row {
    border-radius: 4px;
}

.sub-tree-view.expanded {
    flex: 1;
    transition: flex $transitionDuration $transitionTimingDefault;
}

.sub-tree-view {
    overflow: hidden;
    height: 0;
}

.tree-view-row:hover {
    background: rgba(255, 255, 255, .1);
    cursor: pointer;
}
</style>
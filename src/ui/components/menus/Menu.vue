<template>
    <div :class="classes" :style="style">
        <Button @click="this.collapsed = !this.collapsed">Open menu</Button>

        <Card v-show="!collapsed" class="elevation-8">
            <template v-for="item in items">
                <template v-if="item.divider">
                    <Divider class="my-2"></Divider>
                </template>
                <template v-else>
                    <slot name="menu-item" v-bind="{ item }">
                        <menu-item :icon="item.icon" :to="item.to">
                            <template #item-icon>
                                <slot name="item-icon" v-bind="{ item }"></slot>
                            </template>
                            <slot name="item-label" v-bind="{ item }">
                                {{ item.label }}
                            </slot>
                            <template #item-end>
                                <slot name="item-end" v-bind="{ item }"></slot>
                            </template>
                        </menu-item>
                    </slot>
                </template>
            </template>

        </Card>
    </div>
</template>
<script>
export default {
    name: "Menu",
    props: {
        items: {
            type: Array,
            default: () => ([])
        },
        width: {
            type: [String, Number],
            default: null
        }
    },
    computed: {
        classes() {
            return [
                "menu-dropdown",
                { collapsed: this.collapsed }
            ];
        },
        style() {
            return [
                this.width ? `width: ${this.width}px` : ""
            ];
        }
    },
    data() {
        return {
            collapsed: true
        };
    }
}; 
</script>
<style lang="scss">
    .menu-dropdown {
        position: relative;
    }
    .menu-dropdown .card {
        position: absolute;
        top: 110%;
        z-index: 1000;
    }
</style>
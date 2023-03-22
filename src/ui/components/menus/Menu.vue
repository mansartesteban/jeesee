<template>
    <div :class="classes" :style="style">
        <Button @click="this.collapsed = !this.collapsed">Open menu</Button>

        <div v-show="!collapsed">
            <template v-for="item in items">
                <template v-if="item.divider">
                    <Divider></Divider>
                </template>
                <template v-else>
                    <menu-item :icon="item.icon">
                        <template #item-icon>
                            <slot name="item-icon" v-bind="{ item }"></slot>
                        </template>
                        <slot name="menu-item" v-bind="{ item }">
                            {{ item.label }}
                        </slot>
                        <template #item-end>
                            <slot name="item-end" v-bind="{ item }"></slot>
                        </template>
                    </menu-item>
                </template>
            </template>

        </div>
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
<style lang="">
    
</style>
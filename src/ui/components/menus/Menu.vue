<template>
    <div
        class="menu-dropdown"
        :class="classes"
        :style="style"
        ref="menu-dropdown"
    >
        <slot
            name="activator"
            v-bind="{ onClick: activatorOn }"
        >
            <Button
                @click="activatorOn"
                :icon="'bi bi-' + activatorIcon"
            >{{ activatorLabel }}</Button>
        </slot>

        <Card
            v-show="!collapsed"
            class="menu-overlay elevation-8"
            :style="overlayStyle"
        >
            <template v-for="item in items">
                <template v-if="item.divider">
                    <Divider class="my-2"></Divider>
                </template>
                <template v-else>
                    <slot
                        name="menu-item"
                        v-bind="{ item }"
                    >
                        <menu-item
                            :icon="item.icon"
                            :to="item.to"
                            :callback="item.callback"
                            @item-clicked="collapsed = true"
                        >
                            <template #item-icon>
                                <slot
                                    name="item-icon"
                                    v-bind="{ item }"
                                ></slot>
                            </template>
                            <slot
                                name="item-label"
                                v-bind="{ item }"
                            >
                                {{ item.label }}
                            </slot>
                            <template #item-end>
                                <slot
                                    name="item-end"
                                    v-bind="{ item }"
                                ></slot>
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
        activatorLabel: {
            type: String,
            default: ""
        },
        activatorIcon: {
            type: String,
            default: ""
        },
        hideOnClick: {
            type: Boolean,
            defautl: false
        },
        items: {
            type: Array,
            default: () => ([])
        },
        width: {
            type: [String, Number],
            default: null
        }
    },
    data() {
        return {
            collapsed: true,
            overlayStyle: {
                "--mouse-x": "0px",
                "--mouse-y": "0px"
            }
        };
    },
    computed: {
        classes() {
            return [
                { collapsed: this.collapsed }
            ];
        },
        style() {
            return [
                this.width ? `width: ${this.width}px` : ""
            ];
        }
    },
    methods: {
        activatorOn(event) {
            this.collapsed = !this.collapsed;

            let boundingActivator = this.$refs["menu-dropdown"].getBoundingClientRect();

            this.overlayStyle["--mouse-x"] = boundingActivator.x + "px";
            this.overlayStyle["--mouse-y"] = (boundingActivator.y + boundingActivator.height) + "px";
        },
        closeOnBlur(e) {
            const menu = this.$refs["menu-dropdown"];
            if (!menu.contains(e.target) && e.target !== menu) {
                this.collapsed = true;
            }
        }
    },
    mounted() {
        window.addEventListener("click", this.closeOnBlur);
    },
    beforeUnmount() {
        window.removeEventListener("click", this.closeOnBlur);
    }
}; 
</script>
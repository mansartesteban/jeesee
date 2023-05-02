<template>
    <div
        class="menu-dropdown"
        :class="classes"
        :style="style"
        ref="menu-dropdown"
    >
        <Card
            v-show="opened"
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
                            @item-clicked="closeOnBlur"
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
    expose: [
        "openMenu",
        "onClose",
        "closeOnBlur"
    ],
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
            opened: false,
            overlayStyle: {
                "--mouse-x": "0px",
                "--mouse-y": "0px"
            },
            executeOnClose: []
        };
    },
    computed: {
        classes() {
            return [
                { opened: this.opened }
            ];
        },
        style() {
            return [
                this.width ? `width: ${this.width}px` : ""
            ];
        }
    },
    methods: {
        openMenu(event) {
            this.opened = true;

            let boundingActivator = new DOMRect(event.clientX, event.clientY, 0, 0);

            this.overlayStyle["--mouse-x"] = boundingActivator.x + "px";
            this.overlayStyle["--mouse-y"] = (boundingActivator.y + boundingActivator.height) + "px";
        },
        onClose(callback) {
            this.executeOnClose.push(callback);
        },
        closeOnBlur(e) {
            const menu = this.$refs["menu-dropdown"];
            if (e === undefined || !menu.contains(e.target) && e.target !== menu) {
                this.opened = false;

                if (this.executeOnClose.length > 0) {
                    this.executeOnClose.forEach(callback => callback());
                    this.executeOnClose.splice(0, this.executeOnClose.length);
                }
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
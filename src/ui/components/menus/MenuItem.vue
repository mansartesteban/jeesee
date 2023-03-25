<template>
    <template v-if="to">
        <RouterLink :to="to">
            <div class="menu-item d-flex" @click="$emit('item-clicked')">
                <div class="d-flex flex flex-row flex-nowrap justify-content-space-between">
                    <slot name="item-icon" v-bind="{ icon }">
                        <i v-if="icon" class="bi" :class="`bi-${icon}`"></i>
                    </slot>

                    <slot></slot>
                    <div class="flex"></div>

                    <slot name="item-end"></slot>
                </div>
            </div>
        </RouterLink>
    </template>

    <template v-else>
        <div class="menu-item d-flex" @click="$emit('item-clicked')">
            <div class="d-flex flex flex-row flex-nowrap justify-content-space-between">
                <slot name="item-icon" v-bind="{ icon }">
                    <i v-if="icon" class="bi" :class="`bi-${icon}`"></i>
                </slot>

                <slot></slot>
                <div class="flex"></div>

                <slot name="item-end"></slot>
            </div>
        </div>
    </template>
</template>
<script>
export default {
    name: "MenuItem",
    props: {
        icon: {
            type: String,
            default: null
        },
        to: {
            type: String,
            default: null
        }
    }
};
</script>
<style lang="">
    
</style>
<template>
    <div class="menu-item d-flex" @click="$emit('item-clicked')">
        <div class="d-flex flex flex-row flex-nowrap justify-content-space-between">
            <slot name="item-icon" v-bind="{ icon }">
                <i v-if="icon" class="bi me-4" :class="`bi-${icon}`"></i>
            </slot>

            <slot></slot>
            <div class="flex"></div>

            <slot name="item-end"></slot>
        </div>
    </div>
</template>
<script>
export default {
    name: " MenuItemContent",
    props: {
        icon: {
            type: String,
            default: null
        },
        to: {
            type: [String, Object],
            default: null
        }
    }
};
</script>
<style lang="">
    
</style>
<template>
    <div :class="classes">
        <div v-if="$slots['card-header']" class="card-header">
            <slot name="card-header"></slot>
        </div>
        <div class="card-body">
            <slot name="card-body">
                <slot></slot>
            </slot>
        </div>
        <div class="card-footer">
            <slot name="card-footer"></slot>
        </div>
    </div>
</template>

<script>
export default {
    name: "Card",
    props: {
        color: {
            type: String,
            default: "primary"
        }
    },
    computed: {
        classes() {
            return [
                "card",
                this.color
            ];
        }
    }
};
</script>
<style lang="">
    
</style>
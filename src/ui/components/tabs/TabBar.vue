<template>
    <div :class="classes">
        <slot></slot>
    </div>
</template>
<script>
export default {
    name: "TabBar",
    props: {
        vertical: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        classes() {
            return [
                "tab-bar",
                "d-flex",
                "flex-shrink-0",
                "gap-2",
                { "flex-column": this.vertical },
                { "flex-row": !this.vertical },
            ];
        }
    }
};
</script>
<style lang="scss">
    
</style>
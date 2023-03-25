<template>
    <div class="toolbar" :class="classes">
        <slot></slot>
    </div>
</template>
<script>
export default {
    computed: {
        classes() {
            return {
                "p-2": this.$slots.default
            };
        }
    }
};
</script>
<style lang="scss">

    @import "@styles/vars";
    .toolbar {
        border: 1px solid rgba($primary, .25);
    }
</style>
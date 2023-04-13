<template>
    <div
        class="toolbar d-flex flex-nowrap flex-row"
        :class="classes"
    >
        <slot></slot>
    </div>
</template>
<script>
export default {
    computed: {
        classes() {
            return {
            };
        }
    }
};
</script>
<style lang="scss"></style>
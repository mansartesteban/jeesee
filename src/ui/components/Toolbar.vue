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
            };
        }
    }
};
</script>
<style lang="scss"></style>
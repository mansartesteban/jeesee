<template>
    <Button elevation="4" :active="active" color="primary" rounded hoverable outlined borderless>
        <slot></slot>
    </Button>
</template>
<script>
export default {
    props: {
        active: {
            type: Boolean,
            default: false
        }
    },
    methods: {

    }
};
</script>
<style lang="">
    
</style>
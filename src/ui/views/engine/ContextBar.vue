<template>
    <div class="context-bar">
        test
        {{ this.$engine?.scene?.sceneManager?.entities }}
        <TreeView></TreeView>
    </div>
</template>
<script>
export default {
    data() {
        return {
            entities: []
        };
    },
    computed: {

    },
    mounted() {
        this.$engine.onStart(() => {

            console.log("engine started !",);
        });
    }

};
</script>
<style lang="">
    
</style>
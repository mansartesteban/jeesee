<template>
    <div
        ref="scene-view"
        class="scene-view flex"
    ></div>
</template>
<script>
export default {
    mounted() {
        for (let statsPanel of document.getElementsByClassName("stats-panel")) {
            statsPanel.remove();
        }
        this.$engine.start(this.$refs["scene-view"]);
    },
    beforeUnmount() {
        for (let statsPanel of document.getElementsByClassName("stats-panel")) {
            statsPanel.remove();
        }
    }
};
</script>
<style lang="">
    
</style>
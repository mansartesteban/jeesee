<template lang="">
    <div class="engine-view">
        <div ref="scene-view" class="scene-view"></div>
    </div>
</template>

<script>
import Game from "@/engine/game/Game";

export default {
    mounted() {
        // TODO: Retrieve layout grid datas
        // Initialize three (loader)

        let game = new Game();
        game.start(this.$refs["scene-view"]);

        // window.addEventListener("mousemove", (e) => {
        //     this.$refs["scene-view"].style.width = e.clientX + "px";
        //     let event = new Event("resize");
        //     this.$refs["scene-view"].dispatchEvent(event);
        // });
    }
};
</script>
<style lang="scss">
    .scene-view {
        width: 50%;
        height: 360px;
        resize: both;
        // padding: 1em;
        // border: 1px solid grey;
        // margin: 1em;
    }
    .scene-view canvas {
        position: relative;
        left: -2em;
    }
</style>
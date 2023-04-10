<template>
    <div
        ref="engine-view"
        class="engine-view"
    >
        <SideBar ref="side-bar"></SideBar>
        <SceneView ref="scene-view"></SceneView>
        <ContextBar ref="context-bar"></ContextBar>
        <BottomBar ref="bottom-bar"></BottomBar>
    </div>
</template>

<script>
import GuiLayout from "@/engine/game/gui/layouts/GuiLayout";
import BlockLayout from "@/engine/game/gui/layouts/BlockLayout";

export default {
    mounted() {

        let layout = new GuiLayout(this.$refs["engine-view"]);

        let sideBar = new BlockLayout({
            x: 0,
            y: 0,
            width: 5,
            height: 95,
            zIndex: 10000
        }, this.$refs["side-bar"].$el);
        let bottomBar = new BlockLayout({
            x: 0,
            y: 95,
            width: 100,
            height: 5
        }, this.$refs["bottom-bar"].$el);
        let sceneView = new BlockLayout({
            x: 5,
            y: 0,
            width: 65,
            height: 95,
        }, this.$refs["scene-view"].$el);
        let contextBar = new BlockLayout({
            x: 70,
            y: 0,
            width: 30,
            height: 95,
        }, this.$refs["context-bar"].$el);

        layout.addBlock(sideBar);
        layout.addBlock(bottomBar);
        layout.addBlock(sceneView);
        layout.addBlock(contextBar);

        this.$engine.start(this.$refs["scene-view"].$el);

    }
};
</script>
<style lang="scss">

    .engine-view {
        position: relative;
        height: 100%;
    }

</style>
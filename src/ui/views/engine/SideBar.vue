<template>
    <div class="side-bar pn-2 d-flex flex-column align-items-center">
        <Button icon="box" @click="addCube"></Button>
        <Button icon="circle" @click="addSphere"></Button>
        <Button icon="triangle" @click="addTetrahedron"></Button>
    </div>
</template>
<script>
import Cube from '@/engine/core/shapes/Cube';
import { Sphere } from 'three';

export default {
    methods: {
        addCube() {
            let box = new Cube();
            this.$engine.scene.sceneManager.add(box);
        },
        addSphere() {
            let sphere = new Sphere();
            this.$engine.scene.sceneManager.add(sphere);
        },
        addTetrahedron() {
        }
    },
};
</script>
<style lang="">
    
</style>



<!-- <div class="side-bar pn-2 d-flex flex-column align-items-center layout-block resizable" style="z-index: 1; inset: 0% 95% 20% 0%;"> -->

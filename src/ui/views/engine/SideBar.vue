<template>
    <div class="side-bar pn-2 d-flex flex-column align-items-center">
        <Button icon="box" @click="addCube"></Button>
        <Button icon="circle" @click="addSphere"></Button>
        <Button icon="triangle" @click="addTetrahedron"></Button>
        <Divider></Divider>
        <Button icon="bug" @click="dump"></Button>
    </div>
</template>
<script>
import Entity from '@/engine/game/Entity';
import CubeRender from '@/engine/game/scenes/Default/Renders/CubeRender';
import SphereRender from '@/engine/game/scenes/Default/Renders/SphereRender';
import TetrahedronRender from '@/engine/game/scenes/Default/Renders/TetrahedronRender';
import PhysicsComponent from '@/engine/game/scenes/Default/Components/PhysicsComponent';
import GeometryUtils from '@/engine/utils/GeometryUtils';
import { Vector2, Vector3 } from 'three';

export default {
    methods: {
        addCube() {
            let cube = new Entity(new CubeRender());
            this.$engine.scene.sceneManager.add(cube);
        },
        addSphere() {
            class SpherePhysics extends PhysicsComponent {
                update(entity) {
                    entity.position.z -= .003;
                }
            }

            let sphere = new Entity(new SphereRender(), new SpherePhysics());
            this.$engine.scene.sceneManager.add(sphere);
        },
        async addTetrahedron() {

            class RotateAroundPhysics extends PhysicsComponent {
                update(entity) {
                    GeometryUtils.rotateAroundAxisPosition(entity.position, new Vector3(0, 1, 0), .01);
                }
            }


            for (let i = 0; i < 100; i++) {
                await new Promise(res => setTimeout(res, 5));
                let tetrahedron = new Entity(new TetrahedronRender(), new RotateAroundPhysics());
                tetrahedron.position.x = 2;
                this.$engine.scene.sceneManager.add(tetrahedron);
            }
        },
        dump() {
            console.log(this.$engine.scene.sceneManager.entities.length);
        }
    },
};
</script>
<style lang="">
    
</style>



<!-- <div class="side-bar pn-2 d-flex flex-column align-items-center layout-block resizable" style="z-index: 1; inset: 0% 95% 20% 0%;"> -->

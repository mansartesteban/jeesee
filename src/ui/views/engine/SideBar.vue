<template>
    <div class="side-bar pn-2 d-flex flex-column align-items-center">
        <Button icon="box" @click="addCube"></Button>
        <Button icon="circle" @click="addSphere"></Button>
        <Button icon="triangle" @click="addTetrahedron"></Button>
        <Button icon="person" @click="addCharacter"></Button>
        <Divider></Divider>
        <Button icon="bug" @click="dump"></Button>
        <Button icon="arrow-bar-down" @click="toggleGravity"></Button>
    </div>
</template>
<script>
import Entity from '@/engine/game/Entity';
import CubeRender from '@/engine/game/scenes/Default/Renders/CubeRender';
import SphereRender from '@/engine/game/scenes/Default/Renders/SphereRender';
import TetrahedronRender from '@/engine/game/scenes/Default/Renders/TetrahedronRender';
import PhysicsComponent from '@/engine/game/scenes/Default/Components/PhysicsComponent';
import GeometryUtils from '@/engine/utils/GeometryUtils';
import { GridHelper, Vector2, Vector3 } from 'three';
import CharacterRender from '@/engine/game/scenes/Default/Renders/CharacterRender';
import CharacterPhysics from '@/engine/game/scenes/Default/Entities/Character/CharacterPhysics';
import Gravity from '@/engine/game/scenes/Default/Entities/Character/Gravity';
import Grid from '@/engine/game/scenes/Default/Entities/Grid/Grid';
import Skybox from '@/engine/game/scenes/Default/Entities/SkyBox/Skybox';

export default {
    data() {
        return {
            gravity: false,
            gravityComponent: new Gravity()
        };
    },
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

        async addCharacter() {
            let character = new Entity(
                new CharacterRender(),
                new CharacterPhysics(),
                // new Gravity()
            );
            await new Promise(r => setTimeout(r, 2000)); // Find a workaround to load heavy entites
            character.position.set(2, 0, 1);
            this.$engine.scene.sceneManager.add(character);
        },
        toggleGravity() {
            if (!this.gravity) {
                this.$engine.scene.sceneManager.entities
                    .filter(entity => !(entity instanceof Grid) && !(entity instanceof Skybox))
                    .forEach(entity => {
                        entity.addComponent(this.gravityComponent);
                    });
            } else {
                this.$engine.scene.sceneManager.entities.forEach(entity => {
                    entity.removeComponent(this.gravityComponent);
                });
            }

            this.gravity = !this.gravity;
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

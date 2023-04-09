<template>
    <div class="side-bar pn-2 d-flex flex-column align-items-center">
        <Button
            icon="box"
            @click="addCube"
        ></Button>
        <Button
            icon="circle"
            @click="addSphere"
        ></Button>
        <Button
            icon="triangle"
            @click="addTetrahedron"
        ></Button>
        <Button
            icon="person"
            @click="addCharacter"
        ></Button>
        <Divider></Divider>
        <Button
            icon="bug"
            @click="dump"
        ></Button>
        <Button
            icon="x-lg"
            @click="removeColliders"
        ></Button>
        <Button
            icon="arrow-bar-down"
            @click="toggleGravity"
        ></Button>
        <Divider></Divider>
        <Button
            icon="camera-video-off"
            @click="resetCamera"
        ></Button>
        <Button
            :icon="paused ? 'play' : 'pause'"
            @click="toggleLoop"
        ></Button>
    </div>
</template>
<script>
import Entity from '@/engine/game/Entity';
import CubeRender from '@/engine/game/scenes/Default/Renders/CubeRender';
import SphereRender from '@/engine/game/scenes/Default/Renders/SphereRender';
import TetrahedronRender from '@/engine/game/scenes/Default/Renders/TetrahedronRender';
import PhysicsComponent from '@/engine/game/scenes/Default/Components/PhysicsComponent';
import GeometryUtils from '@/engine/utils/GeometryUtils';
import { GridHelper, Quaternion, Vector2, Vector3 } from 'three';
import CharacterRender from '@/engine/game/scenes/Default/Renders/CharacterRender';
import CharacterPhysics from '@/engine/game/scenes/Default/Entities/Character/CharacterPhysics';
import Gravity from '@/engine/game/scenes/Default/Components/Gravity';
import Grid from '@/engine/game/scenes/Default/Entities/Grid/Grid';
import Skybox from '@/engine/game/scenes/Default/Entities/SkyBox/Skybox';
import Ground from '@/engine/game/scenes/Default/Entities/Ground';
import TransformComponent from '@/engine/game/scenes/Default/Components/TransformComponent';
import Collider from '@/engine/game/scenes/Default/Components/Colliders/Collider';
import SceneManager from '@/engine/game/SceneManager';
import RotateAroundPhysics from '@/engine/game/scenes/Default/Components/RotateAroundPhysics';

export default {
    data() {
        return {
            gravity: false,
            paused: false
        };
    },
    methods: {
        addCube() {
            let cube = new Entity(new CubeRender());
            SceneManager.add(cube);
        },
        addSphere() {
            class SpherePhysics extends PhysicsComponent {
                update(entity) {
                    entity.transform.position.add(new Vector3(0, 0, -0.003));
                }
            }

            let sphere = new Entity(new SphereRender(), new SpherePhysics());
            SceneManager.add(sphere);
        },
        removeColliders() {
            SceneManager.entities.forEach(entity => entity.removeComponents(Collider));
        },
        toggleLoop() {
            this.$engine.scene.paused = !this.$engine.scene.paused;
            this.paused = this.$engine.scene.paused;
        },
        async addTetrahedron() {

            for (let i = 0; i < 90; i++) {
                await new Promise(res => setTimeout(res, 100));
                let tetrahedron = new Entity(new TetrahedronRender(), new RotateAroundPhysics());
                tetrahedron.transform.position.add(new Vector3(2, 0, 0));
                SceneManager.add(tetrahedron);
            }
        },

        async addCharacter() {
            let character = new Entity(
                new CharacterRender(),
                new CharacterPhysics(),
                // new Gravity()
            );
            await new Promise(r => setTimeout(r, 2000)); // Find a workaround to load heavy entites
            character.transform.position = new Vector3(2, 0, 1);
            SceneManager.add(character);
        },
        toggleGravity() {
            let gravityComponent = [];
            SceneManager.entities.forEach(() => {
                gravityComponent.push(new Gravity());
            });
            if (!this.gravity) {
                SceneManager.entities
                    .filter(entity => !(entity instanceof Grid) && !(entity instanceof Skybox) && !(entity instanceof Ground))
                    .forEach((entity, k) => {
                        entity.addComponent(gravityComponent[k]);
                    });
            }

            this.gravity = !this.gravity;
        },
        resetCamera() {

            this.$engine.scene.camera.position.copy(new Vector3(5, 5, 5));
            this.$engine.scene.camera.zoom = 1;

            const qx = new Quaternion();
            qx.setFromAxisAngle(new Vector3(0, 1, 0), Math.PI / 4);
            const qz = new Quaternion();
            qz.setFromAxisAngle(new Vector3(-1, 0, 0), Math.PI / 4);

            const q = new Quaternion();
            q.multiply(qx).multiply(qz);

            this.$engine.scene.camera.quaternion.copy(q);
            this.$engine.scene.controls.theta = -Math.PI / 4;
            this.$engine.scene.controls.phi = Math.PI / 4;
        },
        dump() {
            console.log(SceneManager.entities.length);
        }
    },
};
</script>
<style lang="">
    
</style>



<!-- <div class="side-bar pn-2 d-flex flex-column align-items-center layout-block resizable" style="z-index: 1; inset: 0% 95% 20% 0%;"> -->

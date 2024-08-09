<template>
    <div class="side-bar py-2 gap-2 d-flex flex-column align-items-center">

        <Menu
            :items="shapesMenu"
            activatorIcon="boxes"
        ></Menu>

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
            icon="sign-stop"
            @click="breakSpawn = true"
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
import Entity from '@core/Entity';
import CubeRender from '@core/renderers/CubeRenderer';
import SphereRender from '@core/renderers/SphereRenderer';
import TetrahedronRender from '@core/renderers/TetrahedronRenderer';
import PhysicsComponent from '@core/components/PhysicsComponent';
import { Quaternion, Vector3 } from 'three';
import CharacterRender from '@/engine/game/scenes/Default/Renderers/CharacterRenderer';
import TempleRender from '@/engine/game/scenes/Default/Renderers/TempleRenderer';
import CharacterPhysics from '@/engine/game/scenes/Default/Entities/Character/CharacterPhysics';
import SceneManager from '@core/SceneManager';
import RotateAroundPhysics from '@/engine/game/scenes/Default/Components/RotateAroundPhysics';
import Collider from '@core/components/colliders/Collider';

export default {
    data() {
        return {
            gravity: false,
            paused: false,
            breakSpawn: false,
            tetrahedronPhysics: new RotateAroundPhysics(),
            tetrahedronRender: new TetrahedronRender(),
            shapesMenu: [
                {
                    label: "Cube",
                    icon: "square",
                    callback: this.addCube
                },
                {
                    label: "Sphere",
                    icon: "circle",
                    callback: this.addSphere
                },
                {
                    label: "Tetrahedron",
                    icon: "triangle",
                    callback: this.addTetrahedron
                },
                {
                    label: "Character",
                    icon: "person",
                    callback: this.addCharacter
                },
                {
                    label: "Temple",
                    icon: "bank",
                    callback: this.addTemple
                }
            ]
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
            let tetrahedron = new Entity(new RotateAroundPhysics(), new TetrahedronRender());
            tetrahedron.transform.position.add(new Vector3(2, 0, 0));
            SceneManager.add(tetrahedron);
        },

        async addCharacter() {
            let character = new Entity(
                new CharacterRender(),
                new CharacterPhysics(),
            );
            await new Promise(r => setTimeout(r, 2000)); // Find a workaround to load heavy entites => THREE.LoadingManager
            character.transform.position = new Vector3(2, 0, 1);
            SceneManager.add(character);
        },
        async addTemple() {
            let character = new Entity(
                new TempleRender(),
                new CharacterPhysics(),
            );
            await new Promise(r => setTimeout(r, 2000)); // Find a workaround to load heavy entites => THREE.LoadingManager
            character.transform.position = new Vector3(2, 0, 1);
            SceneManager.add(character);
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

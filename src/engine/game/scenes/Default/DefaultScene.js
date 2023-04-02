import Scene from "@/engine/game/Scene";
import { PerspectiveCamera, PointLight, Quaternion, Vector3 } from "three";
import Controls from "../../Controls";
import CarPhysics from "./Entities/Car/CarPhysics";
import PhysicsComponent from "./Components/PhysicsComponent";
import Stats from 'stats.js';

import Car from "./Entities/Car/Car";
import Ball from "./Entities/Ball/Ball";
import Skybox from "./Entities/SkyBox/Skybox";
import Grid from "./Entities/Grid/Grid";

import CarRender from "./Renders/CarRender";
import BallRender from "./Renders/BallRender";
import SkyboxRender from "./Renders/SkyBoxRender";
import GridRender from "./Renders/GridRender";

import Entity from "../../Entity";
import CharacterRender from "./Renders/CharacterRender";
import CharacterPhysics from "./Entities/Character/CharacterPhysics";

class DefaultScene extends Scene {

    skybox;

    constructor(mountOn) {
        super(mountOn);
    }

    init() {
        this.addCamera();
        // this.addDefaultCube();
        this.addGrid();
        this.addLight();
        this.addSkybox();
        this.addFpsHelper();

        this.addDefaultEntities();

        this.controls = new Controls(this.camera, this.renderer);
        this.controls.theta = -Math.PI / 4;
        this.controls.phi = Math.PI / 4;

    }

    addDefaultEntities() {
        let car = new Car(new PhysicsComponent(), new CarPhysics(), new CarRender());
        let ball = new Ball(new PhysicsComponent(), new BallRender());
        this.sceneManager.add(car);
        this.sceneManager.add(ball);
    }

    addFpsHelper() {
        this.stats = new Stats();
        this.stats.showPanel(0);
        document.body.appendChild(this.stats.dom);
    }

    addLight() {
        let light = new PointLight(0xFFFFFF, 1, 10000);
        light.position.x = 100;
        light.position.y = 200;
        light.position.z = 300;
        this.scene.add(light);
    }

    addCamera() {
        this.camera = new PerspectiveCamera(
            80,
            (this.mountOn.clientWidth) / this.mountOn.clientHeight,
            0.1,
            10000
        );

        this.camera.position.copy(new Vector3(5, 5, 5));

        const qx = new Quaternion();
        qx.setFromAxisAngle(new Vector3(0, 1, 0), Math.PI / 4);
        const qz = new Quaternion();
        qz.setFromAxisAngle(new Vector3(-1, 0, 0), Math.PI / 4);

        const q = new Quaternion();
        q.multiply(qx).multiply(qz);

        console.log(q);
        this.camera.quaternion.copy(q);
    }

    addGrid() {
        let grid = new Grid(new GridRender({ size: 100, divisions: 100, color1: 0xffffff, color2: 0xbbbbbb }));
        this.sceneManager.add(grid);
    }

    addSkybox() {
        let path = "/assets/medias/skybox/";
        let format = '.jpg';
        let urls = [
            path + 'posx' + format,
            path + 'negx' + format,
            path + 'posy' + format,
            path + 'negy' + format,
            path + 'posz' + format,
            path + 'negz' + format
        ];

        let skybox = new Skybox(
            new SkyboxRender({ urls })
        );
        this.sceneManager.add(skybox);

    }

    update(tick) {
        if (this.controls) {
            if (this.stats) {
                this.stats.begin();
                this.stats.end();
            }
            this.controls.update(tick);
        }
    }
}

export default DefaultScene;

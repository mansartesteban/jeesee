import Scene from "@/engine/game/Scene";
import { GridHelper, PerspectiveCamera, PointLight, Quaternion, Vector3 } from "three";
import Controls from "../../Controls";
import Stats from 'stats.js';

import Skybox from "./Entities/SkyBox/Skybox";

import SkyboxRender from "./Renders/SkyBoxRender";

import SceneManager from "../../SceneManager";
import Entity from "../../Entity";
import TetrahedronRender from "./Renders/TetrahedronRender";
import RotateAroundPhysics from "./Components/RotateAroundPhysics";
import CubeRender from "./Renders/CubeRender";

class DefaultScene extends Scene {

    lastUpdate = null;
    lastFramerates = [];

    boundingBox;
    aabb;

    boundingBoxScene;
    aabbScene;

    constructor(mountOn) {
        super(mountOn);
    }

    init() {
        this.addCamera();
        this.addGrid();
        this.addLight();
        this.addSkybox();
        this.addFpsHelper();

        this.addDefaultEntity();

        this.controls = new Controls(this.camera, this.renderer);
        this.controls.theta = -Math.PI / 4;
        this.controls.phi = Math.PI / 4;

    }

    addDefaultEntity() {
        let box = new Entity(new CubeRender());
        SceneManager.add(box);
    }

    addFpsHelper() {
        this.stats = new Stats();
        this.stats.showPanel(0);
        this.stats.dom.style.zIndex = 1;
        document.body.appendChild(this.stats.dom);

        let sceneView = document.getElementsByClassName("scene-view");
        if (sceneView) {
            let boundingBox = sceneView[0].getBoundingClientRect();
            this.stats.dom.style.top = boundingBox.top + "px";
            this.stats.dom.style.left = boundingBox.left + "px";
        }
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

        this.camera.quaternion.copy(q);
    }

    addGrid() {

        let options = {
            size: 100,
            divisions: 100,
            color1: 0xffffff,
            color2: 0xaaaaaa
        };

        // Grid is not added to SceneManager as we can't modify it
        this.scene.add(new GridHelper(
            options.size,
            options.divisions,
            options.color1,
            options.color2
        ));
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
        SceneManager.add(skybox);

    }

    addTetra() {
        let tetrahedron = new Entity(new TetrahedronRender(), new RotateAroundPhysics());
        tetrahedron.transform.position.x = 2;
        SceneManager.add(tetrahedron);
    }

    update(tick) {
        if (this.stats) {
            this.stats.update();
        }
        if (this.controls) {
            this.controls.update(tick);
        }
    }
}

export default DefaultScene;

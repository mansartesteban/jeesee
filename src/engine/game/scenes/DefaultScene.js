import Cube from "@/engine/core/shapes/Cube";
import Grid from "@/engine/core/shapes/Grid";
import Skybox from "@/engine/core/shapes/Skybox";
import Sphere from "@/engine/core/shapes/Sphere";
import Scene from "@/engine/game/Scene";
import { Euler, OrthographicCamera, PerspectiveCamera, PointLight, Quaternion, Vector3 } from "three";
import Controls from "../Controls";

class DefaultScene extends Scene {

    skybox;

    constructor(mountOn) {
        super(mountOn);
    }

    init() {
        this.addCamera();
        this.addDefaultCube();
        this.addGrid();
        this.addLight();
        this.addSkybox();

        this.controls = new Controls(this.camera, this.renderer);
        this.controls.theta = -Math.PI / 4;
        this.controls.phi = Math.PI / 4;

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
        // this.camera = new OrthographicCamera(
        //     this.mountOn.clientWidth,
        //     this.mountOn.clientHeight,
        //     .1, 1000
        // );

        this.camera.position.copy(new Vector3(3, 3, 3));

        const qx = new Quaternion();
        qx.setFromAxisAngle(new Vector3(0, 1, 0), Math.PI / 4);
        const qz = new Quaternion();
        qz.setFromAxisAngle(new Vector3(-1, 0, 0), Math.PI / 4);

        const q = new Quaternion();
        q.multiply(qx).multiply(qz);


        this.camera.quaternion.copy(q);
    }

    addDefaultCube() {
        let cube = new Cube();
        cube.object.position.copy(new Vector3(-2, 0, -1));
        this.sceneManager.add(cube);

        let sphere = new Sphere();
        sphere.object.position.copy(new Vector3(2, 0, -1));
        this.sceneManager.add(sphere);

    }

    addGrid() {
        let grid = new Grid(100, 100, 0xffffff, 0xbbbbbb);
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

        this.skybox = new Skybox({ urls });
        this.sceneManager.add(this.skybox);

    }

    update(tick) {
        if (this.controls) {
            this.controls.update(tick);
            this.skybox?.object.position.copy(this.camera.position);
        }
    }
}

export default DefaultScene;

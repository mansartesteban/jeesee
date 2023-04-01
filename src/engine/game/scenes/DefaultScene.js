import Cube from "@/engine/core/shapes/Cube";
import Grid from "@/engine/core/shapes/Grid";
import Skybox from "@/engine/core/shapes/Skybox";
import Sphere from "@/engine/core/shapes/Sphere";
import Scene from "@/engine/game/Scene";
import { BoxGeometry, Euler, Mesh, MeshPhongMaterial, OrthographicCamera, PerspectiveCamera, PointLight, Quaternion, SphereGeometry, Vector3 } from "three";
import Controls from "../Controls";
import RenderComponent from "../RenderComponent";



class Entity {
    constructor(...components) {
        this.position = new Vector3();
        this.rotation = new Vector3();
        this.velocity = new Vector3();

        this.components = components;
    }

    bindSceneManager(sceneManager) {
        this.sceneManager = sceneManager;
    }

    // save() {
    //     return {
    //         ...this.position,
    //         ...this.rotation,
    //         ...this.velocity
    //     };
    // }

    update(tick) {
        this.components.forEach(component => component.update(this, tick));
        // console.log()
    }
}

class PhysicsComponent {

    update(entity, tick) {
        entity.position.y = Math.cos(tick / 100) * 4;
    }
}

class CarPhysics extends PhysicsComponent {

    update(entity, tick) {
        entity.position.x = Math.cos(tick / 200) * 2;
        entity.rotation.y = Math.cos(tick / 100) * 3;
    }
}

class Car extends Entity {
    constructor(...components) {
        super(...components);
    }
}

class Ball extends Entity {
    constructor(...components) {
        super(...components);
    }
}

class CarRender extends RenderComponent {
    constructor() {
        super();
        this.geometry = new BoxGeometry(1, 1, 1);
        this.material = new MeshPhongMaterial({ color: 0xffffff });
        this.object = new Mesh(this.geometry, this.material);
    }

}

class BallRender extends RenderComponent {
    constructor() {
        super();
        this.geometry = new SphereGeometry(1, 10, 5);
        this.material = new MeshPhongMaterial({ color: 0xffffff });
        this.object = new Mesh(this.geometry, this.material);
    }
}


class DefaultScene extends Scene {

    skybox;

    constructor(mountOn) {
        super(mountOn);
    }

    init() {
        this.addCamera();
        // this.addDefaultCube();
        // this.addGrid();
        this.addLight();
        // this.addSkybox();

        this.addComponentEntities();

        this.controls = new Controls(this.camera, this.renderer);
        this.controls.theta = -Math.PI / 4;
        this.controls.phi = Math.PI / 4;

    }

    addComponentEntities() {
        let car = new Car(new CarPhysics(), new CarRender());
        let ball = new Ball(new PhysicsComponent(), new BallRender());
        this.sceneManager.add(car);
        this.sceneManager.add(ball);
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

import Scene from "@/engine/game/Scene";
import { Box3, Box3Helper, BoxBufferGeometry, BoxHelper, BufferGeometry, GridHelper, Matrix4, Mesh, MeshBasicMaterial, PerspectiveCamera, PointLight, Quaternion, SphereGeometry, Vector3 } from "three";
import Controls from "../../Controls";
import CarPhysics from "./Entities/Car/CarPhysics";
import BallPhysics from "./Entities/Ball/BallPhysics";
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

import Ground from "./Entities/Ground";
import GroundRender from "./Renders/GroundRender";
import Collider from "./Components/Colliders/Collider";
import SceneManager from "../../SceneManager";

class DefaultScene extends Scene {

    boundingBox;
    aabb;

    boundingBoxScene;
    aabbScene;

    constructor(mountOn) {
        super(mountOn);
    }

    init() {
        this.addCamera();
        this.addGround();
        this.addGrid();
        this.addLight();
        this.addSkybox();
        this.addFpsHelper();

        this.addDefaultEntities();

        this.controls = new Controls(this.camera, this.renderer);
        this.controls.theta = -Math.PI / 4;
        this.controls.phi = Math.PI / 4;

    }

    addGround() {
        let ground = new Ground(new GroundRender());
        SceneManager.add(ground);
    }

    addDefaultEntities() {

        let carRender = new CarRender();
        let ballRender = new BallRender();
        let car = new Car(
            new PhysicsComponent(),
            new CarPhysics(),
            new Collider(),
            carRender
        );
        let ball = new Ball(
            new BallPhysics(),
            new Collider(),
            ballRender
        );
        car.transform.position.x += 2;
        SceneManager.add(car);
        SceneManager.add(ball);


        carRender.object.geometry.computeBoundingBox();
        carRender.object.geometry.computeBoundingBox();

        this.obj = carRender.object;
        this.box = new Box3();
        this.boxScene = new Box3();
        this.boxScene.setFromObject(this.scene);



        // const object = new Mesh(car.object, new MeshBasicMaterial(0xff0000));
        this.boundingBox = new Box3Helper(this.box, 0xff0000);
        this.boundingBoxScene = new Box3Helper(this.boxScene, 0x00FF00);
        this.scene.add(this.boundingBox);
        this.scene.add(this.boundingBoxScene);

        // const threeObject = carRender.object;
        // const box3 = new Box3();

        // // conform to the object size like it's a boundingBox
        // box3.setFromObject(threeObject);

        // // make a BoxBufferGeometry of the same size as Box3
        // const dimensions = new Vector3().subVectors(box3.max, box3.min);
        // const boxGeo = new BufferGeometry(dimensions.x, dimensions.y, dimensions.z);
        // console.log(boxGeo);
        // boxGeo.position.copy(car.position);

        // move new mesh center so it's aligned with the original object
        // const matrix = new Matrix4().setPosition(dimensions.addVectors(box3.min, box3.max).multiplyScalar(0.5));
        // boxGeo.applyMatrix(matrix);

        // make a mesh
        // const mesh = new Mesh(boxGeo, new MeshBasicMaterial({ color: 0xffcc55 }));

        // this.scene.add(mesh);

        // const sphere = new SphereGeometry();
        // const object = new Mesh(sphere, new MeshBasicMaterial(0xff0000));
        // const box = new BoxHelper(object, 0xffff00);
        // this.scene.add(box);
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

    update(tick) {

        this.box.copy(this.obj.geometry.boundingBox).applyMatrix4(this.obj.matrixWorld);
        this.boxScene.setFromObject(this.scene);

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

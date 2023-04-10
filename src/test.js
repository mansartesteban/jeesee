const THREE = require('three');
import Stats from 'stats.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialiasing: false });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio * 2);


let add = false;
let cubeCount = 1;
let isLoading = false;

let btn = document.createElement("button");
btn.innerText = "Toggle Add";
btn.style.marginLeft = "8em";
btn.onclick = () => {
    add = !add;
};
document.body.appendChild(btn);
let btnShow = document.createElement("button");
btnShow.innerText = "Show";
btnShow.onclick = () => {
    console.info(cubeCount, renderer.info.render.triangles);
};
document.body.appendChild(btnShow);
document.body.appendChild(renderer.domElement);


// const loader = new GLTFLoader();
const loader = new OBJLoader();

// async function load() {
//     isLoading = true;
//     let model = await loader.load('/assets/models/funko_test_model/scene.gltf', (model) => {
//         model.scene.scale.set(.01, .01, .01);
//         scene.add(model.scene);
//         isLoading = false;
//         console.log("triangles:", renderer.info.render.triangles);
//     });
// }

async function load() {
    isLoading = true;
    await loader.load('/assets/models/temple/AncientTemple.obj', (model) => {
        // model.scene.scale.set(.01, .01, .01);
        scene.add(model);
        isLoading = false;
        console.log("triangles:", renderer.info.render.triangles);
    });
}

load();

let light = new THREE.PointLight(0xFFFFFF, 10, 1000);
light.position.x = 100;
light.position.y = 100;
light.position.z = 100;

scene.add(light);

const geometry = new THREE.BoxBufferGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

camera.position.z = 5;
const stats = new Stats();
stats.showPanel(0);



function animate() {
    requestAnimationFrame(animate);
    stats.update();
    renderer.render(scene, camera);
    if (add && !isLoading) {
        load();
        // for (let i = 0; i < 10; i++) {
        //     scene.add(new THREE.Mesh(geometry, material));
        //     cubeCount++;
        // }
    }
}
animate();


document.body.appendChild(stats.dom);
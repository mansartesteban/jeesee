import { WebGLRenderer, Scene as ThreeScene, PerspectiveCamera, LineSegments, WireframeGeometry, SphereGeometry, Quaternion, Vector3, Raycaster, Vector2, MeshBasicMaterial, Mesh } from "three";
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { OutlinePass } from 'three/addons/postprocessing/OutlinePass.js';
import SceneManager from "@/engine/game/SceneManager";
import GuiControls from "@/engine/game/gui/GuiControls";

class Scene {
	tick;
	renderer;
	camera;
	scene;

	mountOn;
	raycaster = new Raycaster();

	mouse;

	sceneManager;
	guiControls;

	constructor(mountOn = "") {
		this.tick = 0;
		this.mountOn = mountOn || document.body;

		if (window.requestAnimationFrame === undefined) {
			throw new Error("The 'requestAnimationFrame' API is required to make JeeSee Engine works !");
		}

		this.scene = new ThreeScene();
		this.renderer = new WebGLRenderer({ antialias: true });

		this.recalculateRatio();

		this.mountOn.appendChild(this.renderer.domElement);

		this.sceneManager = new SceneManager(this.scene);
		this.guiControls = new GuiControls(this.sceneManager);

		this.init();

		this.outlineEffect();

		this.mouse = new Vector2(0, 0);
		this.renderer.domElement.addEventListener("pointermove", (e) => {
			this.mouse.x = (e.layerX / e.target.clientWidth) * 2 - 1;
			this.mouse.y = -(e.layerY / e.target.clientHeight) * 2 + 1;
		});

		this.loop();
	}

	outlineEffect() {
		this.composer = new EffectComposer(this.renderer);

		this.renderPass = new RenderPass(this.scene, this.camera);
		this.composer.addPass(this.renderPass);

		this.outlinePass = new OutlinePass(new Vector2(window.innerWidth, window.innerHeight), this.scene, this.camera);
		this.composer.addPass(this.outlinePass);
	}

	recalculateRatio() {

		if (this.renderer !== null) {
			this.renderer.setSize(this.mountOn.clientWidth, this.mountOn.clientHeight);
		}
		if (this.composer) {
			this.composer.setSize(this.mountOn.clientWidth, this.mountOn.clientHeight);
		}
		if (this.camera) {
			this.camera.aspect = (this.mountOn.clientWidth) / this.renderer.domElement.height;
			this.camera.updateProjectionMatrix();
		}
	}

	checkIntersection() {

		if (this.controls) {
			this.raycaster.setFromCamera(this.mouse, this.camera);
			let intersects = [];
			this.raycaster.intersectObject(this.scene, true, intersects);
			intersects = intersects.filter(inter => {
				let found = this.sceneManager.entities.find(entity => entity.object === inter.object);
				return found && found.selectable;
			});

			if (intersects.length > 0) {
				const selectedObject = intersects[0].object;
				this.outlinePass.selectedObjects = [selectedObject];
			}
		}

	}

	loop() {
		this.tick++;

		this.checkIntersection();

		this.composer.render();

		this.update(this.tick);
		this.sceneManager.update(this.tick);

		this.recalculateRatio();

		// if (this.renderer && this.scene && this.camera) {
		// 	this.renderer.render(this.scene, this.camera);
		// }

		// setTimeout(() => {
		window.requestAnimationFrame(this.loop.bind(this));
		// }, 100)

	}

	update(tick) { }
	init() { }
}

export default Scene;

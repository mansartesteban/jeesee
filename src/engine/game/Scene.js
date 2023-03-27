import { WebGLRenderer, Scene as ThreeScene, PerspectiveCamera, LineSegments, WireframeGeometry, SphereGeometry, Quaternion, Vector3, Raycaster, Vector2, MeshBasicMaterial, Mesh } from "three";
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { OutlinePass } from 'three/addons/postprocessing/OutlinePass.js';
import SceneManager from "@/engine/game/SceneManager";
import GuiControls from "@/engine/game/gui/GuiControls";
import { ViewHelper } from 'three/addons/helpers/ViewHelper.js';

class Scene {
	tick;
	renderer;
	camera;
	scene;

	mountOn;
	raycaster = new Raycaster();

	mouse;
	helper;

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
		this.renderer.autoClear = false;

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

		this.renderer.domElement.addEventListener("mousedown", (e) => {
			this.sceneManager.entities.forEach(entity => entity.selected = false);
			let intersectObject = this.getIntersectObjects();
			if (intersectObject) {
				intersectObject.selected = true;
			}
		});

		this.helper = new ViewHelper(this.camera, this.renderer.domElement);
		this.helper.handleClick = (e) => {
			console.log("ev", e);
		};

		this.loop();
	}

	outlineEffect() {
		this.composer = new EffectComposer(this.renderer);

		this.renderPass = new RenderPass(this.scene, this.camera);
		this.composer.addPass(this.renderPass);

		this.outlinePass = new OutlinePass(new Vector2(window.innerWidth, window.innerHeight), this.scene, this.camera);
		this.outlinePass.visibleEdgeColor.set(0x40c2ad);
		this.composer.addPass(this.outlinePass);

		this.outlinePass2 = new OutlinePass(new Vector2(window.innerWidth, window.innerHeight), this.scene, this.camera);
		this.outlinePass2.visibleEdgeColor.set(0xff7b00);
		this.composer.addPass(this.outlinePass2);
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

	getIntersectObjects(first = true) {

		if (this.controls) {
			this.raycaster.setFromCamera(this.mouse, this.camera);
			let intersects = [];
			this.raycaster.intersectObject(this.scene, true, intersects);
			if (intersects.length > 0) {
				let entities = [];
				intersects = intersects.forEach(inter => {
					this.sceneManager.entities.forEach(entity => {
						if (entity.selectable && entity.object === inter.object) {
							entities.push(entity);
						}
					});
				}, []);

				return first ? entities[0] : entities;
			}

		}
		return [];

	}

	loop() {
		this.tick++;
		let intersectObject = this.getIntersectObjects();
		if (intersectObject?.object) {
			this.outlinePass.selectedObjects = [intersectObject.object];
		}

		this.outlinePass2.selectedObjects = this.sceneManager.entities.filter(entity => entity.selected).map(entity => entity.object);

		this.update(this.tick);
		this.sceneManager.update(this.tick);

		// this.helper.qua

		this.recalculateRatio();

		if (this.renderer && this.scene && this.camera) {
			if (this.outlinePass.selectedObjects.length > 0 || this.outlinePass2.selectedObjects.length > 0) {
				this.composer.render();
			} else {
				this.renderer.render(this.scene, this.camera);
			}

			this.helper.render(this.renderer);
		}

		// setTimeout(() => {
		window.requestAnimationFrame(this.loop.bind(this));
		// }, 100)

	}

	update(tick) { }
	init() { }
}

export default Scene;

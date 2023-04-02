import { WebGLRenderer, Scene as ThreeScene, PerspectiveCamera, LineSegments, WireframeGeometry, SphereGeometry, Quaternion, Vector3, Raycaster, Vector2, MeshBasicMaterial, Mesh, Plane } from "three";
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { OutlinePass } from 'three/addons/postprocessing/OutlinePass.js';
import SceneManager from "@/engine/game/SceneManager";
import GuiControls from "@/engine/game/gui/GuiControls";
import { ViewHelper } from 'three/addons/helpers/ViewHelper.js';
import RenderComponent from "./scenes/Default/Components/RenderComponent";
import MoveModifier from "./scenes/MoveModifier";

class Scene {
	tick;
	renderer;
	camera;
	scene;

	mountOn;

	mouse;
	focusedMouse = new Vector2();
	raycaster = new Raycaster();
	intersectedObjects = [];
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

		let t = false;

		let moveModifier = new MoveModifier();


		const onPointerMove = (e) => {
			this.mouse.x = (e.layerX / e.target.clientWidth) * 2 - 1;
			this.mouse.y = -(e.layerY / e.target.clientHeight) * 2 + 1;

			if (t) {
				this.focusedMouse.x += (e.movementX / e.target.clientWidth) * 2;
				this.focusedMouse.y += -(e.movementY / e.target.clientHeight) * 2;
			}

		};

		const onMouseDown = (e) => {
			this.focusedMouse.copy(this.mouse);
			let intersectObject = this.getIntersectEntities(true)[0];
			this.sceneManager.entities.forEach(entity => {
				entity.selected = false;
				entity.removeComponent(moveModifier);
			});
			if (intersectObject) {
				this.controls && this.controls.pause();
				intersectObject.addComponent(moveModifier);
				intersectObject.selected = true;
				t = true;
			}
		};

		const onMouseUp = (e) => {
			t = false;
			this.controls.resume();
		};

		this.renderer.domElement.addEventListener("pointermove", onPointerMove.bind(this));
		this.renderer.domElement.addEventListener("mousedown", onMouseDown.bind(this));
		this.renderer.domElement.addEventListener("mouseup", onMouseUp.bind(this));

		this.helper = new ViewHelper(this.camera, this.renderer.domElement);


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

	getIntersectEntities() {

		let entities = [];
		if (this.intersectedObjects && this.intersectedObjects.length > 0) {

			this.intersectedObjects.forEach(inter => {
				this.sceneManager.entities.forEach(entity => {
					if (entity.selectable) {
						entity.components
							.filter(component => component instanceof RenderComponent)
							.forEach(renderComponent => {
								if (renderComponent.object === inter.object) {
									entities.push(entity);
								}
							});

					}
				});
			});


			return entities;
		}

		return entities;

	}

	loop() {
		this.tick++;

		let selectedObjects = this.sceneManager.entities.filter(entity => entity.selected);

		this.raycaster.setFromCamera(this.mouse, this.camera);
		this.intersectedObjects = [];
		this.raycaster.intersectObject(this.scene, true, this.intersectedObjects);

		this.outlinePass.selectedObjects = [];
		let intersectObject = this.getIntersectEntities()[0];
		let obj = intersectObject?.getObject();
		if (obj) {
			this.outlinePass.selectedObjects = [obj];
		}

		this.outlinePass2.selectedObjects = selectedObjects.map(entity => entity?.getObject());

		if (selectedObjects && selectedObjects.length > 0) {

			let moveModifier = selectedObjects[0].components.find(component => component instanceof MoveModifier);

			if (moveModifier) {
				this.raycaster.setFromCamera(this.focusedMouse, this.camera);

				let intersectPlane = new Vector3();
				let plane = new Plane(new Vector3(0, 1, 0), 0);
				this.raycaster.ray.intersectPlane(plane, intersectPlane);
				moveModifier.updatePosition(intersectPlane.x, intersectPlane.y, intersectPlane.z);
				// intersectPlane = intersectPlane.sub(selectedObjects[0].object.position);
				// selectedObjects[0].addComponent().getObject().position.set();
			}

		}


		this.update(this.tick);
		this.sceneManager.update(this.tick);

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

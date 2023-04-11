import { WebGLRenderer, Scene as ThreeScene, PerspectiveCamera, LineSegments, WireframeGeometry, SphereGeometry, Quaternion, Vector3, Raycaster, Vector2, MeshBasicMaterial, Mesh, Plane } from "three";
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { OutlinePass } from 'three/addons/postprocessing/OutlinePass.js';
import SceneManager from "@/engine/game/SceneManager";
import GuiControls from "@/engine/game/gui/GuiControls";
import { ViewHelper } from 'three/addons/helpers/ViewHelper.js';
import MeshRenderComponent from "./scenes/Default/Components/MeshRenderComponent";
import MoveModifier from "./scenes/MoveModifier";
import TransformComponent from "./scenes/Default/Components/TransformComponent";


var lastCalledTime;
var fps;

class Scene {
	tick;
	renderer;
	camera;
	scene;

	mountOn;

	paused = false;

	mouse;
	focusedMouse = new Vector2();
	raycaster = new Raycaster();
	intersectedObjects = [];
	helper;

	guiControls;

	constructor(mountOn = "") {
		this.tick = 0;
		this.mountOn = mountOn || document.body;

		if (window.requestAnimationFrame === undefined) {
			throw new Error("The 'requestAnimationFrame' API is required to make JeeSee Engine works !");
		}

		this.scene = new ThreeScene();
		SceneManager.addScene(this.scene);

		this.renderer = new WebGLRenderer({ antialias: true });
		this.renderer.autoClear = false;

		this.recalculateRatio();

		this.mountOn.appendChild(this.renderer.domElement);

		// this.guiControls = new GuiControls();

		this.init();

		this.outlineEffect();

		this.mouse = new Vector2(0, 0);

		let t = false;

		// let tmp = document.createElement("div");
		// tmp.style.position = "absolute";
		// tmp.style.width = "5px";
		// tmp.style.height = "5px";
		// tmp.style.background = "red";
		// tmp.style.zIndex = "1000000";
		// document.body.appendChild(tmp);

		const onPointerMove = (e) => {
			if (t) {
				this.focusedMouse.x += (e.movementX / e.target.clientWidth) * 2;
				this.focusedMouse.y += -(e.movementY / e.target.clientHeight) * 2;
			}

			this.mouse.x = ((e.layerX / e.target.clientWidth) * 2 - 1) + (t ? this.focusedMouse.x : 0);
			this.mouse.y = (-(e.layerY / e.target.clientHeight) * 2 + 1) + (t ? this.focusedMouse.y : 0);
		};

		let moveModifier = new MoveModifier();

		const onMouseDown = (e) => {

			if (e.which === 2) this.camera.zoom = 1;

			if (e.which !== 3) {
				e.preventDefault();
				let intersectObject = this.getIntersectEntities(true)[0];
				SceneManager.entities.forEach(entity => {
					entity.selected = false;
					entity.removeComponent(moveModifier);
				});
				if (intersectObject) {
					this.raycaster.setFromCamera(this.mouse, this.camera);
					this.controls && this.controls.pause();
					intersectObject.selected = true;

					let intersectPlane = new Vector3();
					let planeNormal = new Vector3(0, 1, 0);
					let plane = new Plane(planeNormal, 0);

					this.raycaster.ray.intersectPlane(plane, intersectPlane);
					intersectPlane.sub(intersectObject.transform.position);

					moveModifier.setPlane(plane);
					moveModifier.setDelta(intersectPlane);
					t = true;
					intersectObject.addComponent(moveModifier);
				}
			}
		};

		const onMouseUp = (e) => {
			t = false;
			this.controls.resume();
			SceneManager.entities.forEach(entity => {
				entity.selected = false;
				entity.removeComponent(moveModifier);
			});
			this.focusedMouse = new Vector2();
		};

		const onWheel = (e) => {
			if (this.camera.zoom - e.deltaY / 1000 > .5) {
				this.camera.zoom += -e.deltaY / 1000;
			}
		};

		this.renderer.domElement.addEventListener("pointermove", onPointerMove.bind(this));
		this.renderer.domElement.addEventListener("mousedown", onMouseDown.bind(this));
		this.renderer.domElement.addEventListener("mouseup", onMouseUp.bind(this));
		this.renderer.domElement.addEventListener("wheel", onWheel.bind(this), { passive: true });

		// document.body.addEventListener("contextmenu", (e) => {
		// 	e.preventDefault();
		// });

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
				SceneManager.entities.forEach(entity => {
					if (entity.selectable) {
						entity.components
							.filter(component => component instanceof MeshRenderComponent)
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


		if (!this.paused) {
			this.tick++;

			let selectedObjects = SceneManager.entities.filter(entity => entity.selected);

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
					this.raycaster.setFromCamera(this.mouse, this.camera);

					let intersectPlane = new Vector3();
					this.raycaster.ray.intersectPlane(moveModifier.getPlane(), intersectPlane);
					moveModifier.updatePosition(intersectPlane.x, intersectPlane.y, intersectPlane.z);
				}

			}


			this.update(this.tick);
			SceneManager.update(this.tick);

			this.recalculateRatio();

			if (this.renderer && this.scene && this.camera) {
				if (this.outlinePass.selectedObjects.length > 0 || this.outlinePass2.selectedObjects.length > 0) {
					this.composer.render();
				} else {
					this.renderer.render(this.scene, this.camera);
				}

				this.helper.render(this.renderer);
			}
		}
		setTimeout(() => {
			window.requestAnimationFrame(this.loop.bind(this));
		}, 0);
	}



	update(tick) { }
	init() { }
}

export default Scene;

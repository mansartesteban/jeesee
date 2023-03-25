import { WebGLRenderer, Scene as ThreeScene, PerspectiveCamera, LineSegments, WireframeGeometry, SphereGeometry } from "three";
import SceneManager from "@/engine/game/SceneManager";
import GuiControls from "@/engine/game/gui/GuiControls";

class Scene {
	tick;
	renderer;
	camera;
	scene;

	mountOn;

	sceneManager;
	guiControls;

	constructor(mountOn = "") {
		this.tick = 0;
		this.mountOn = mountOn || document.body;

		if (window.requestAnimationFrame === undefined) {
			throw new Error("L'API 'requestAnimationFrame' ne fonctionne pas sur ce navigateur");
		}

		let controls = document.getElementById("controls");

		let controlsWidth = controls?.clientWidth || 0;

		this.scene = new ThreeScene();
		this.camera = new PerspectiveCamera(
			80,
			(this.mountOn.clientWidth - controlsWidth) / this.mountOn.clientHeight,
			0.1,
			5000
		);

		this.renderer = new WebGLRenderer({ antialias: true });
		this.renderer.setSize(this.mountOn.clientWidth - controlsWidth, this.mountOn.clientHeight);
		this.mountOn.addEventListener("resize", () => {
			let controls = document.getElementById("controls");
			let controlsWidth = controls?.clientWidth || 0;

			if (this.renderer !== null) {
				this.renderer.setSize(this.mountOn.clientWidth - controlsWidth, this.mountOn.clientHeight);
			}
			if (this.camera !== null) {
				this.camera.aspect =
					(this.mountOn.clientWidth - controlsWidth) / this.renderer.domElement.height;
				this.camera.updateProjectionMatrix();
			}
		});

		if (this.camera) {
			this.camera.position.y = 0;
			this.camera.position.z = 250;
			this.camera.rotation.x = 0;

		}

		this.mountOn.appendChild(this.renderer.domElement);

		this.sceneManager = new SceneManager(this.scene);

		this.guiControls = new GuiControls(this.sceneManager);

		this.guiControls.observer.$on(GuiControls.EVENTS.NODE_SELECTED, (node) => {
			console.log("selected", node);
		});

		this.init();
		this.loop();
	}

	loop() {
		this.tick++;

		this.update(this.tick);
		this.sceneManager.update(this.tick);

		if (this.renderer && this.scene && this.camera) {
			this.renderer.render(this.scene, this.camera);
		}

		// setTimeout(() => {
		window.requestAnimationFrame(this.loop.bind(this));
		// }, 100)

	}

	update(tick) { }
	init() { }
}

export default Scene;

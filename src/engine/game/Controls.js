import { Camera, Euler, Quaternion, Renderer, Vector3 } from "three";
import { clamp } from "three/src/math/MathUtils";

class Controls {
	camera;
	renderer;

	keys = [];
	actions;

	mouseSensitivity = 1;
	cameraSpeed = 1;
	theta = 0;
	phi = 0;

	constructor(camera, renderer) {
		this.camera = camera;
		this.renderer = renderer;

		this.actions = {};

		this.addListeners();
		this.bindActions();
		this.bindMouseMovments();
	}

	update(tick) {
		this.keys.forEach(k => {
			if (this.actions[k]) {
				this.actions[k].bind(this)();
			}
		});
	}

	bindActions() {
		this.actions = {
			z: this.moveForward,
			s: this.moveBackward,
			q: this.moveLeft,
			d: this.moveRight,
			a: this.moveDown,
			e: this.moveUp,
		};
	}

	bindMouseMovments() {
		this.renderer.domElement.addEventListener("click", async () => {
			if (this.renderer.domElement !== document.pointerLockElement) {
				await this.renderer.domElement.requestPointerLock();

				this.renderer.domElement.addEventListener("mousemove", (e) => {
					if (this.renderer.domElement === document.pointerLockElement) {
						const movementX = (e.movementX || 0) * 0.0005;
						const movementY = (e.movementY || 0) * 0.0005;

						this.phi += -movementX * 5;
						this.theta = clamp(
							this.theta + -movementY * 5,
							-Math.PI / 3,
							Math.PI / 3
						);

						const qx = new Quaternion();
						qx.setFromAxisAngle(new Vector3(0, 1, 0), this.phi);
						const qz = new Quaternion();
						qz.setFromAxisAngle(new Vector3(1, 0, 0), this.theta);

						const q = new Quaternion();
						q.multiply(qx).multiply(qz);

						this.camera.quaternion.copy(q);

					}
				});

				this.renderer.domElement.addEventListener("wheel", (e) => {
					this.cameraSpeed *= Math.pow(1.05, -e.deltaY / Math.abs(e.deltaY));
					if (this.cameraSpeed <= 0) this.cameraSpeed = 0.1;
				});
			}
		});
	}

	addListeners() {
		window.addEventListener("keypress", (e) => {
			if (this.keys.indexOf(e.key) === -1) {
				this.keys.push(e.key);
			}
		});
		window.addEventListener("keyup", (e) => {
			if (this.keys.indexOf(e.key) !== -1) {
				this.keys = this.keys.filter((k) => k !== e.key);
			}
		});
	}

	moveCamera(direction) {
		const q = new Quaternion();
		q.setFromAxisAngle(new Vector3(0, 1, 0), this.phi);
		direction.applyQuaternion(q);
		direction.multiplyScalar(this.cameraSpeed);

		this.camera.position.add(direction);
	}

	moveForward() {
		this.moveCamera(new Vector3(0, 0, -1));
	}

	moveLeft() {
		this.moveCamera(new Vector3(-1, 0, 0));
	}

	moveRight() {
		this.moveCamera(new Vector3(1, 0, 0));
	}

	moveBackward() {
		this.moveCamera(new Vector3(0, 0, 1));
	}

	moveDown() {
		this.moveCamera(new Vector3(0, -1, 0));
	}

	moveUp() {
		this.moveCamera(new Vector3(0, 1, 0));
	}

}

export default Controls;

import PointLight from "@/engine/game/actors/StellarSystem/PointLight";
import Scene from "@/engine/game/Scene";
import StellarSystem from "@/engine/game/actors/StellarSystem/StellarSystem";

import {
	Mesh,
	Vector3,
} from "three";

class MainScene extends Scene {
	cube;

	constructor() {
		super();
	}

	init() {
		let sterllarSystem = new StellarSystem();
		this.sceneManager.add(sterllarSystem);

		let pointLight;

		pointLight = new PointLight({
			position: new Vector3(100, 100, 100)
		});
		this.sceneManager.add(pointLight);

		pointLight = new PointLight({
			position: new Vector3(-100, -100, -100)
		});
		this.sceneManager.add(pointLight);

		pointLight = new PointLight({
			position: new Vector3(100, 100, -100)
		});
		this.sceneManager.add(pointLight);

		pointLight = new PointLight({
			position: new Vector3(100, -100, 100)
		});
		this.sceneManager.add(pointLight);

		pointLight = new PointLight({
			position: new Vector3(100, -100, -100)
		});
		this.sceneManager.add(pointLight);

		pointLight = new PointLight({
			position: new Vector3(-100, 100, 100)
		});
		this.sceneManager.add(pointLight);

		pointLight = new PointLight({
			position: new Vector3(-100, 100, -100)
		});
		this.sceneManager.add(pointLight);

		pointLight = new PointLight({
			position: new Vector3(-100, -100, 100)
		});
		this.sceneManager.add(pointLight);



	}

	update() {
	}
}

export default MainScene;

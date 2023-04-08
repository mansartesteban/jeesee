import PointLight from "@/engine/game/actors/StellarSystem/PointLight";
import Scene from "@/engine/game/Scene";
import StellarSystem from "@/engine/game/actors/StellarSystem/StellarSystem";

import { Vector3 } from "three";
import SceneManager from "../SceneManager";

class MainScene extends Scene {
	cube;

	constructor() {
		super();
	}

	init() {
		let sterllarSystem = new StellarSystem();
		SceneManager.add(sterllarSystem);

		let pointLight;

		pointLight = new PointLight({
			position: new Vector3(100, 100, 100)
		});
		SceneManager.add(pointLight);

		pointLight = new PointLight({
			position: new Vector3(-100, -100, -100)
		});
		SceneManager.add(pointLight);

		pointLight = new PointLight({
			position: new Vector3(100, 100, -100)
		});
		SceneManager.add(pointLight);

		pointLight = new PointLight({
			position: new Vector3(100, -100, 100)
		});
		SceneManager.add(pointLight);

		pointLight = new PointLight({
			position: new Vector3(100, -100, -100)
		});
		SceneManager.add(pointLight);

		pointLight = new PointLight({
			position: new Vector3(-100, 100, 100)
		});
		SceneManager.add(pointLight);

		pointLight = new PointLight({
			position: new Vector3(-100, 100, -100)
		});
		SceneManager.add(pointLight);

		pointLight = new PointLight({
			position: new Vector3(-100, -100, 100)
		});
		SceneManager.add(pointLight);



	}

	update() {
	}
}

export default MainScene;

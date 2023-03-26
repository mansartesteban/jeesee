// import PhysicsEngineScene from "@/engine/game/scenes/PhysicsEngine/PhysicsEngineScene";
import DefaultScene from "./scenes/DefaultScene";

class Engine {
	scene;

	constructor() {
		this.scene = null;
	}
	start(mountOn = "") {
		// this.scene = new PhysicsEngineScene(mountOn);
		this.scene = new DefaultScene(mountOn);
	}
}

export default Engine;

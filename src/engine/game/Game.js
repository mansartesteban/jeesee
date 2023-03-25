import PhysicsEngineScene from "@/engine/game/scenes/PhysicsEngine/PhysicsEngineScene";

class Game {
	scene;

	constructor() {
		this.scene = null;
	}
	start(mountOn = "") {
		this.scene = new PhysicsEngineScene(mountOn);
	}
}

export default Game;

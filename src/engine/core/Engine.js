import App from "@core/App";
import Observer from "@core/Observer";
import DefaultScene from "@/engine/game/scenes/Default/DefaultScene";
import Bundle from "@core/Bundle";
import Store from "@engine/storage/Store";

class Engine {

	scene;
	app;

	static EVENTS = Object.freeze({
		STARTED: "STARTED"
	});

	observer = new Observer(Engine.EVENTS);

	constructor() {
		this.scene = null;
		this.app = App;
	}
	start(mountOn = "") {
		this.scene = new DefaultScene(mountOn);

		this.observer.$emit(Engine.EVENTS.STARTED);


		let db = this.app.getBundle(Bundle.BUNDLES.DATABASE);
		let store = db.getStore(Store.STORES.CONFIGS);

		// store.save("entities", this.scene.sceneManager.entities);

	}

	onStart(callback) {
		this.observer.$on(Engine.EVENTS.STARTED, callback);
	}
}

export default Engine;

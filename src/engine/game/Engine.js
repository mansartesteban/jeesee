import App from "../core/App";
import Bundle from "../core/Bundle";
import Observer from "../core/Observer";
import Store from "../storage/Store";
import DefaultScene from "./scenes/Default/DefaultScene";

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


		// let db = this.app.getBundle(Bundle.BUNDLES.DATABASE);
		// let store = db.getStore(Store.STORES.SCENE);

		// store.save("entities", this.scene.sceneManager.entities);

	}

	onStart(callback) {
		this.observer.$on(Engine.EVENTS.STARTED, callback);
	}
}

export default Engine;

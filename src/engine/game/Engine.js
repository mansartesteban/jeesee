import App from "../core/App";
import Bundle from "../core/Bundle";
import Store from "../storage/Store";
import DefaultScene from "./scenes/DefaultScene";

class Engine {
	scene;
	app;

	constructor() {
		this.scene = null;
		this.app = App;
	}
	start(mountOn = "") {
		this.scene = new DefaultScene(mountOn);


		// let db = this.app.getBundle(Bundle.BUNDLES.DATABASE);
		// let store = db.getStore(Store.STORES.SCENE);

		// store.save("entities", this.scene.sceneManager.entities);

	}
}

export default Engine;

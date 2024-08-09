
import Bundle from "@/engine/core/Bundle";

import app from "@/engine/core/App";
// import ProjectStore from "@store/ProjectStore";

import Config from "@engine/Config";
import DatabaseConfig from "@config/database.json";
import Store from "@engine/storage/Store";

const initializeConfig = async () => {

    Config.setConfig("database", DatabaseConfig);
    // const configStore = db.getStore(Store.STORES.CONFIG);
    // configStore.get("autoSaveInterval");
    // const configStore = db.getStore(Store.STORES.CONFIG);
    // configStore.save("autoSaveInterval", DatabaseConfig.autoSaveInterval);
};

export default {
    install(vue) {

        app.beforeStart(async () => {
            console.log('1');
            await initializeConfig();
            console.log('2');
            let db = app.getBundle(Bundle.BUNDLES.DATABASE);
            // console.log('3');
            db.openStore(Store.STORES.PROJECT);
            db.openStore(Store.STORES.CONFIG);
            Config.attachStore(db.getStore(Store.STORES.CONFIG));

            // db.openStore(SceneStore);
        });

        app.start();

        // Register global variable to access engine as "$engine"
        // Could be accessed with const engine = inject("$engine")
        vue.provide("$engine", app);
    }
};
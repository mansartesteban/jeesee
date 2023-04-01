
import Bundle from "@/engine/core/Bundle";
import SceneStore from "@/engine/storage/stores/SceneStore";

import app from "@/engine/core/App";


export default {
    install(vue) {

        app.beforeStart(() => {
            let db = app.getBundle(Bundle.BUNDLES.DATABASE);
            // db.openStore(SceneStore);
        });

        app.start();

        vue.config.globalProperties.$engineApp = app;
    }
};
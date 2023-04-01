import Store from "@/engine/storage/Store";

class SceneStore extends Store {
  constructor() {
    super(Store.STORES.SCENE);
  }
}

export default new SceneStore();
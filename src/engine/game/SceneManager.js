import Observer from "@/engine/core/Observer";
import RenderComponent from "./scenes/Default/Components/RenderComponent";
import AssetsHandler from "./scenes/AssetsHandler";

class SceneManager {

  static EVENTS = Object.freeze({
    ENTITY_ADDED: "ENTITY_ADDED",
    ENTITY_DELETED: "ENTITY_DELETED",
  });

  observer = new Observer(SceneManager.EVENTS);

  constructor(threeScene) {
    this.entities = [];
    this.threeScene = threeScene;
    console.log("mat1", AssetsHandler.materials);
    console.log("mat2", AssetsHandler.materials);

    // this.autosave();
  }

  // autosave() {
  //   this.observer.$on([SceneManager.EVENTS.ENTITY_ADDED, SceneManager.EVENTS.ENTITY_DELETED], () => {
  //     let db = App.getBundle(Bundle.BUNDLES.DATABASE);
  //     let store = db.getStore(Store.STORES.SCENE);

  //     // store.save("entities", this.entities.map());
  //   });
  // }

  delete(entityName) {
    let foundIndex = this.entities.findIndex(entity => entity.name === entityName);
    if (foundIndex !== -1) {

      let entityFound = this.entities[foundIndex];

      if (entityFound.object) {
        this.observer.$emit(SceneManager.EVENTS.ENTITY_DELETED);
        this.threeScene.remove(entityFound.object);
        entityFound.object.remove();
        entityFound.object.clear();
        delete this.entities[foundIndex];
        this.entities.splice(foundIndex, 1);
      }
    }
  }

  add(entity, entityName) {
    let $this = this;

    if (entityName) entity.name = entityName;

    entity.bindSceneManager(this);

    if (entity.children) {
      entity.children.forEach((child) => $this.add(child));
    }
    this.entities.push(entity);


    entity.components
      .filter(component => component instanceof RenderComponent)
      .forEach(renderComponent => {
        console.log("adding to scene", renderComponent);
        this.threeScene.add(renderComponent.object);
      });


    this.observer.$emit(SceneManager.EVENTS.ENTITY_ADDED);
  }

  get(entityName) {
    return this.entities.find((entity) => entity.name === entityName);
  }

  update(tick) {
    this.entities.forEach((entity) => {
      entity.update(tick);
    });
  }
}


export default SceneManager;
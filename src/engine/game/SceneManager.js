import Observer from "@/engine/core/Observer";
import MeshRenderComponent from "./scenes/Default/Components/MeshRenderComponent";

class SceneManager {

  static EVENTS = Object.freeze({
    ENTITY_ADDED: "ENTITY_ADDED",
    ENTITY_DELETED: "ENTITY_DELETED",
  });

  observer = new Observer(SceneManager.EVENTS);

  entities = [];
  threeScene = null;

  addScene(threeScene) {
    this.threeScene = threeScene;
  }

  delete(entityName) {
    let foundIndex = this.entities.findIndex(entity => entity.name === entityName);
    if (foundIndex !== -1) {

      let entityFound = this.entities[foundIndex];

      if (entityFound.object) {
        this.observer.$emit(SceneManager.EVENTS.ENTITY_DELETED, entityFound);
        this.threeScene.remove(entityFound.object);
        entityFound.object.remove();
        entityFound.object.clear();
        delete this.entities[foundIndex];
        this.entities.splice(foundIndex, 1);
      }
    }
  }

  add(entity) {
    let $this = this;

    if (entity.children) {
      entity.children.forEach((child) => $this.add(child));
    }
    this.entities.push(entity);


    entity.components
      .filter(component => component instanceof MeshRenderComponent)
      .forEach(renderComponent => {
        this.threeScene.add(renderComponent.object);
      });


    this.observer.$emit(SceneManager.EVENTS.ENTITY_ADDED, entity);
  }

  update(tick) {
    this.entities.forEach((entity) => {
      entity.update(tick);
    });
  }
}


export default new SceneManager();
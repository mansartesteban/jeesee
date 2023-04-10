import Observer from "@/engine/core/Observer";
import MeshRenderComponent from "./scenes/Default/Components/MeshRenderComponent";
import Entity from "./Entity";

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

  delete(entityToDelete) {

    let foundIndex = this.entities.findIndex(entity => {
      if (typeof entityToDelete === "string") {
        return entity.uuid === entityToDelete;
      } else if (entityToDelete instanceof Entity) {
        return entity === entityToDelete;
      }
      return false;
    });

    if (foundIndex !== -1) {

      let entityFound = this.entities[foundIndex];
      let renderComponent = entityFound.getComponent(MeshRenderComponent);

      if (renderComponent && renderComponent.object) {
        this.observer.$emit(SceneManager.EVENTS.ENTITY_DELETED, entityFound);
        this.threeScene.remove(renderComponent.object);
        renderComponent.object.remove();
        renderComponent.object.clear();
      }

      for (let i = entityFound.components.length - 1; i >= 0; i--) {
        entityFound.components.splice(i, 1);
      }

      delete this.entities[foundIndex];
      this.entities.splice(foundIndex, 1);
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
import Observer from "@/engine/core/Observer";

class SceneManager {

  static EVENTS = Object.freeze({
    ENTITY_ADDED: "ENTITY_ADDED",
    ENTITY_DELETED: "ENTITY_DELETED",
  });

  observer = new Observer(SceneManager.EVENTS);

  constructor(threeScene) {
    this.entities = [];
    this.threeScene = threeScene;

  }

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

    if (entity.children) {
      entity.children.forEach((child) => $this.add(child));
    }
    this.entities.push(entity);
    this.threeScene.add(entity.object);
    this.observer.$emit(SceneManager.EVENTS.ENTITY_ADDED);
  }

  get(entityName) {
    return this.entities.find((entity) => entity.name === entityName);
  }

  update(tick) {
    this.entities.forEach((entity) => {
      entity.updateLoop(tick);
    });
  }
}


export default SceneManager;
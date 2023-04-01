import { generateUUID } from "three/src/math/MathUtils";

class Actor {

    geometry;
    material;
    object;

    children;
    options;

    name;
    parent;
    sceneManager;

    selectable = true;
    selected = false;

    isRigidBody = false;

    constructor(options) {
        this.geometry = this.options?.geometry || null;
        this.material = this.options?.material || null;
        this.object = null;
        this.children = [];

        this.name = generateUUID();
        this.parent = null;

        if (options) {
            this.options = options;
        }

        this.create();
    }

    bindSceneManager(sceneManager) {
        this.sceneManager = sceneManager;
    }

    add(entity) {
        entity.parent = this.name;
        if (this.sceneManager) {
            this.sceneManager.add(entity);
        }
        this.children.push(entity);
        return this;
    }

    create() { }
    spawn() { }

    updateLoop(tick) {
        this.updateRigidBody(tick);
        this.update(tick);
    }

    updateRigidBody(tick) { }
    update(tick) { }

}

export default Actor;

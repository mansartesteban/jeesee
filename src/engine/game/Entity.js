import { Vector3 } from "three";
import RenderComponent from "./scenes/Default/Components/RenderComponent";

class Entity {
    constructor(...components) {
        this.position = new Vector3();
        this.rotation = new Vector3();
        this.velocity = new Vector3();

        this.selectable = true;

        this.components = components;
    }

    addComponent(component) {
        this.components.push(component);
    }

    removeComponent(component) {
        let foundComponent = this.components.findIndex(entityComponent => entityComponent == component);
        if (foundComponent !== -1) {
            delete this.components[foundComponent];
        }
    }

    getObject() {
        let renderComponents = this.components
            .find(component => component instanceof RenderComponent);
        return renderComponents ? renderComponents.object : null;
    }

    bindSceneManager(sceneManager) {
        this.sceneManager = sceneManager;
    }

    // save() {
    //     return {
    //         ...this.position,
    //         ...this.rotation,
    //         ...this.velocity
    //     };
    // }

    update(tick) {
        this.components.forEach(component => component.update(this, tick));
    }
}

export default Entity;
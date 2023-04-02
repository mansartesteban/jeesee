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
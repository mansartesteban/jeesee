import { Vector3 } from "three";
import MeshRenderComponent from "./scenes/Default/Components/MeshRenderComponent";
import TransformComponent from "./scenes/Default/Components/TransformComponent";
import ArrayUtils from "../utils/Arrays";
import { generateUUID } from "three/src/math/MathUtils";

class Entity {

    uuid = generateUUID();

    components = [];

    transform = new TransformComponent();

    constructor(...components) {
        this.velocity = new Vector3(); //TODO: Move in RigidBodyComponent

        this.selectable = true;

        this.components = components;

        this.initialize();

        // if (!this.getComponent(MeshRenderComponent)) {
        //     throw new Error("This entity doesn't have any renderer");
        // }
    }

    addComponent(component) {
        this.components.push(component);
    }

    removeComponent(component) {
        let foundComponent = this.components.findIndex(entityComponent => entityComponent == component);
        if (foundComponent !== -1) {
            this.components.splice(foundComponent, 1);
        }
    }

    removeComponents(componentType) {
        let foundIndexes = ArrayUtils.findIndexMultiple(this.components, (component => component instanceof componentType));
        if (foundIndexes) {
            ArrayUtils.removeMultiple(this.components, foundIndexes);
        }
    }

    getComponent(componentType) {
        return this.components.find(component => {
            return component instanceof componentType;
        });
    }

    getObject() {
        let renderComponents = this.components.find(component => component instanceof MeshRenderComponent);
        return renderComponents ? renderComponents.object : null;
    }

    update(tick) {
        this.components.forEach(component => component.updateComponent(this, tick));
    }

    initialize() { }
}

export default Entity;
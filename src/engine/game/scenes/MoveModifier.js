import { Vector2, Vector3 } from "three";
import PhysicsComponent from "./Default/Components/PhysicsComponent";

class MoveModifier extends PhysicsComponent {

    coordinates = new Vector3();

    updatePosition(x, y, z) {
        this.coordinates.set(x, y, z);
    }

    update(entity) {
        entity.position.copy(this.coordinates);
    }
}

export default MoveModifier;
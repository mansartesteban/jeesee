import { Vector3 } from "three";
import PhysicsComponent from "@core/components/PhysicsComponent";

class MoveModifier extends PhysicsComponent {

    coordinates = new Vector3();
    plane;
    delta = new Vector3();

    setPlane(plane) {
        this.plane = plane;
    }
    setDelta(delta) {
        this.delta = delta;
    }
    getPlane() {
        return this.plane;
    }
    getDelta() {
        return this.delta;
    }

    updatePosition(x, y, z) {
        this.coordinates.set(x, y, z);
    }

    update(entity) {
        entity.transform.position.copy(this.coordinates.sub(this.delta));
    }
}

export default MoveModifier;
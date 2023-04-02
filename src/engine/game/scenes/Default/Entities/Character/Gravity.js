import { Vector3 } from "three";
import PhysicsComponent from "../../Components/PhysicsComponent";

class Gravity extends PhysicsComponent {

    acceleration = new Vector3(0, -9.81, 0);

    update(entity) {
        entity.velocity.add(this.acceleration.clone().multiplyScalar(1 / 60));
        entity.position.add(entity.velocity.clone().multiplyScalar(1 / 60));
    }
}

export default Gravity;
import { Vector3 } from "three";
import PhysicsComponent from "./PhysicsComponent";
import TransformComponent from "./TransformComponent";

class Gravity extends PhysicsComponent {

    acceleration = new Vector3(0, -9.81, 0);
    apply = true;

    constructor(options) {
        super(options);
    }


    update(entity) {
        if (this.apply) {
            this.velocity.add(this.acceleration.clone().multiplyScalar(1 / 60));
            entity.transform.position.add(this.velocity.clone().multiplyScalar(1 / 60));
        }
    }
}

export default Gravity;
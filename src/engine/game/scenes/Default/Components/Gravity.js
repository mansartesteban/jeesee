import { Vector3 } from "three";
import PhysicsComponent from "./PhysicsComponent";

class Gravity extends PhysicsComponent {

    acceleration = new Vector3(0, -9.81, 0);
    apply = true;

    constructor(options) {
        super(options);
    }


    update(entity) {
        if (this.apply) {
            entity.velocity.add(this.acceleration.clone().multiplyScalar(.01));
            entity.transform.position.add(entity.velocity.clone().multiplyScalar(.01));
        }
    }
}

export default Gravity;
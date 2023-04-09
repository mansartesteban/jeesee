import GeometryUtils from "@/engine/utils/GeometryUtils";
import PhysicsComponent from "./PhysicsComponent";
import { Vector3 } from "three";

class RotateAroundPhysics extends PhysicsComponent {

    options = {
        speed: 1
    };

    update(entity) {
        GeometryUtils.rotateAroundAxisPosition(entity.transform.position, new Vector3(0, 1, 0), this.options.speed / 100);
    }
}

export default RotateAroundPhysics;
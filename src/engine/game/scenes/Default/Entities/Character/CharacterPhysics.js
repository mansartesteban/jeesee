import GeometryUtils from "@/engine/utils/GeometryUtils";
import PhysicsComponent from "../../Components/PhysicsComponent";
import { Vector3 } from "three";

class CharacterPhysics extends PhysicsComponent {

    update(entity, tick) {
        entity.rotation.x += Math.cos(tick / 100) / 100;
        entity.rotation.z += Math.cos(tick / 100) / 100;
        // entity.position.x += .01;
        GeometryUtils.rotateAroundAxisPosition(entity.position, new Vector3(0, 1, 0), .02);
    }

}

export default CharacterPhysics;
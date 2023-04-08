import GeometryUtils from "@/engine/utils/GeometryUtils";
import PhysicsComponent from "../../Components/PhysicsComponent";
import { Vector3 } from "three";
import TransformComponent from "../../Components/TransformComponent";

class CharacterPhysics extends PhysicsComponent {

    update(entity, tick) {
        entity.transform.rotation.add(new Vector3(Math.cos(tick / 100) / 100, 0, 0));
        entity.transform.rotation.add(new Vector3(0, 0, Math.cos(tick / 100) / 100));
        GeometryUtils.rotateAroundAxisPosition(entity.transform.position, new Vector3(0, 1, 0), .02);
    }

}

export default CharacterPhysics;
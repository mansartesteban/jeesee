import GeometryUtils from "@/engine/utils/GeometryUtils";
import PhysicsComponent from "../../Components/PhysicsComponent";
import { Vector3 } from "three";

class CharacterPhysics extends PhysicsComponent {

    options = {
        speed: 1
    };

    update(entity, tick) {
        let calc = Math.cos(tick / 100) / 100;
        entity.transform.rotation.add(new Vector3(calc, 0, calc).multiplyScalar(this.options.speed));
    }

}

export default CharacterPhysics;
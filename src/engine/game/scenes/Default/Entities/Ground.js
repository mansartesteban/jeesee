import Entity from "@/engine/game/Entity";
import TransformComponent from "../Components/TransformComponent";
import { Vector3 } from "three";

class Ground extends Entity {
    initialize() {
        this.transform.position.add(new Vector3(0, -5, 0));
    }
}

export default Ground;
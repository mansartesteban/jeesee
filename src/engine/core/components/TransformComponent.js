import { Vector3 } from "three";
import Component from "../Component";

class TransformComponent extends Component {

    position = new Vector3();
    rotation = new Vector3();
    scale = new Vector3(1, 1, 1);

    update() { }

}

export default TransformComponent;
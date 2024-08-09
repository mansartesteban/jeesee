import { BoxGeometry } from "three";
import MeshRenderComponent from "@core/omponents/MeshRenderComponent";

class GroundRender extends MeshRenderComponent {

    createGeometry() {
        return new BoxGeometry(20, 2, 20);
    }

}

export default GroundRender;
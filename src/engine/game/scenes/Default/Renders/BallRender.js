import MeshRenderComponent from "../Components/MeshRenderComponent";
import AssetsHandler from "../../AssetsHandler";

class BallRender extends MeshRenderComponent {

    createGeometry() {
        return AssetsHandler.geometries.sphere;
    }

}

export default BallRender;
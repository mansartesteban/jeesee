import MeshRenderComponent from "../Components/MeshRenderComponent";
import AssetsHandler from "../../AssetsHandler";

class BallRender extends MeshRenderComponent {

    createGeometry() {
        return AssetsHandler.geometries[0];
    }

}

export default BallRender;
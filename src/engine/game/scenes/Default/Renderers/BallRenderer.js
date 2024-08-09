import MeshRenderComponent from "@core/components/MeshRenderComponent";
import AssetsHandler from "@core/AssetsHandler";

class BallRender extends MeshRenderComponent {

    createGeometry() {
        return AssetsHandler.geometries.sphere;
    }

}

export default BallRender;
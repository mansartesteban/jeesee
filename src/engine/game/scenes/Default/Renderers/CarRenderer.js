import MeshRenderComponent from "@core/components/MeshRenderComponent";
import AssetsHandler from "@core/AssetsHandler";

class CarRender extends MeshRenderComponent {

    createGeometry() {
        return AssetsHandler.geometries.cube;
    }

}

export default CarRender;
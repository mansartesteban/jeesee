import MeshRenderComponent from "@core/components/MeshRenderComponent";
import AssetsHandler from "@core/AssetsHandler";

class SphereRender extends MeshRenderComponent {
    createGeometry() {
        return AssetsHandler.geometries.sphere;
    }
}

export default SphereRender;
import AssetsHandler from "@core/AssetsHandler";
import MeshRenderComponent from "@core/components/MeshRenderComponent";

class TetrahedronRender extends MeshRenderComponent {

    createGeometry() {
        return AssetsHandler.geometries.tetrahedron;
    }

}

export default TetrahedronRender;
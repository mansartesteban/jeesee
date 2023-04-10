import AssetsHandler from "../../AssetsHandler";
import MeshRenderComponent from "../Components/MeshRenderComponent";

class TetrahedronRender extends MeshRenderComponent {

    createGeometry() {
        return AssetsHandler.geometries.tetrahedron;
    }

}

export default TetrahedronRender;
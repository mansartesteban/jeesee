import AssetsHandler from "../../AssetsHandler";
import MeshRenderComponent from "../Components/MeshRenderComponent";
import { TetrahedronGeometry } from "three";

class TetrahedronRender extends MeshRenderComponent {

    createGeometry() {
        return AssetsHandler.geometries[0];
    }

}

export default TetrahedronRender;
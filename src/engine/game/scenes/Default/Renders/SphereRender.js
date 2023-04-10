import { SphereGeometry } from "three";
import MeshRenderComponent from "../Components/MeshRenderComponent";
import AssetsHandler from "../../AssetsHandler";

class SphereRender extends MeshRenderComponent {
    createGeometry() {
        return AssetsHandler.geometries.sphere;
    }
}

export default SphereRender;
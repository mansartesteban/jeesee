import { BoxGeometry } from "three";
import MeshRenderComponent from "../Components/MeshRenderComponent";
import AssetsHandler from "../../AssetsHandler";

class CarRender extends MeshRenderComponent {

    createGeometry() {
        return AssetsHandler.geometries.cube;
    }

}

export default CarRender;
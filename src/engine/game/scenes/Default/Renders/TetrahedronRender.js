import AssetsHandler from "../../AssetsHandler";
import RenderComponent from "../Components/RenderComponent";
import { TetrahedronGeometry } from "three";

class TetrahedronRender extends RenderComponent {

    createGeometry() {
        this.geometry = AssetsHandler.geometries[0];
    }

}

export default TetrahedronRender;
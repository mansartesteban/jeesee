import { SphereGeometry } from "three";
import RenderComponent from "../Components/RenderComponent";
import AssetsHandler from "../../AssetsHandler";

class SphereRender extends RenderComponent {
    createGeometry() {
        this.geometry = AssetsHandler.geometries[0];
    }
}

export default SphereRender;
import { BoxGeometry } from "three";
import RenderComponent from "../Components/RenderComponent";
import AssetsHandler from "../../AssetsHandler";

class CarRender extends RenderComponent {

    createGeometry() {
        this.geometry = AssetsHandler.geometries[0];
    }

}

export default CarRender;
import { Mesh, MeshPhongMaterial, SphereGeometry } from "three";
import RenderComponent from "../Components/RenderComponent";
import AssetsHandler from "../../AssetsHandler";

class BallRender extends RenderComponent {

    createGeometry() {
        this.geometry = AssetsHandler.geometries[0];
    }

}

export default BallRender;
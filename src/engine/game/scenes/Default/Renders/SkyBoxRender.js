import { BackSide, BoxGeometry, MeshBasicMaterial, TextureLoader } from "three";
import RenderComponent from "../Components/RenderComponent";

class SkyBoxRender extends RenderComponent {

    createGeometry() {
        this.geometry = new BoxGeometry(10000, 10000, 10000);
    }

    createMaterial() {
        function createMaterialArray(urls) {
            return urls.map(image => {
                let texture = new TextureLoader().load(image);
                return new MeshBasicMaterial({ map: texture, side: BackSide });
            });
        }

        if (this.options) {
            this.material = createMaterialArray(this.options.urls);
        }
    }

}

export default SkyBoxRender;
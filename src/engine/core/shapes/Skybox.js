import Actor from "@/engine/game/actors/Actor";
import { BackSide, BoxGeometry, Mesh, MeshBasicMaterial, TextureLoader } from "three";

class Skybox extends Actor {

    selectable = false;

    options = {
        urls: []
    };
    constructor(options) {
        super(options);
    }

    create() {

        function createMaterialArray(urls) {
            return urls.map(image => {
                let texture = new TextureLoader().load(image);
                return new MeshBasicMaterial({ map: texture, side: BackSide });
            });
        }

        this.geometry = new BoxGeometry(10000, 10000, 10000);
        this.material = createMaterialArray(this.options.urls);
        this.object = new Mesh(this.geometry, this.material);
    }
}

export default Skybox;
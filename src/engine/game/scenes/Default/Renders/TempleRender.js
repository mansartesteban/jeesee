import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';
import MeshRenderComponent from "../Components/MeshRenderComponent";

class TempleRender extends MeshRenderComponent {

    async createMesh() {
        const loader = new OBJLoader();

        loader.load('/assets/models/temple/AncientTemple.obj', model => {
            this.object = model;
            return model.children;
        });


    }

}

export default TempleRender;
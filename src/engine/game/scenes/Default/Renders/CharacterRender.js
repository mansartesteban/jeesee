import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import MeshRenderComponent from "../Components/MeshRenderComponent";

class CharacterRender extends MeshRenderComponent {

    async createMesh() {
        const loader = new GLTFLoader();

        let model = await loader.loadAsync('/assets/models/funko_test_model/scene.gltf');
        model.scene.scale.set(.01, .01, .01);
        this.object = model.scene;
        return model.scene;

    }

}

export default CharacterRender;
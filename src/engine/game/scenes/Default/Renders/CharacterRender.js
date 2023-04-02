import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import RenderComponent from "../Components/RenderComponent";

class CharacterRender extends RenderComponent {

    async createMesh() {
        const loader = new GLTFLoader();

        let model = await loader.loadAsync('/assets/models/funko_test_model/scene.gltf');
        console.log(model);
        model.scene.scale.set(.01, .01, .01);
        this.object = model.scene;
    }

}

export default CharacterRender;
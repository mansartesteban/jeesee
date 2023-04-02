import { Mesh, MeshPhongMaterial } from "three";
import AssetsHandler from "../../AssetsHandler";

class RenderComponent {

    options;

    constructor(options) {
        this.options = { ...this.options, ...options };

        this.createGeometry();
        this.createMaterial();
        this.createMesh();
    }

    createGeometry() { }

    createMaterial() {
        this.material = AssetsHandler.materials[0];
    }
    createMesh() {
        if (this.geometry && this.material) {
            this.object = new Mesh(this.geometry, this.material);
        }
    }

    update(entity) {
        if (this.object) {
            // this.object.position.copy(entity.position);
            // this.object.rotation.setFromVector3(entity.rotation);
        }
    }

}

export default RenderComponent;
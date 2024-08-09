import { Mesh } from "three";
import AssetsHandler from "@core/AssetsHandler";
import Component from "@core/Component";

class MeshRenderComponent extends Component {

    material;
    geometry;
    object;

    // type: Wireframe, shades 

    constructor(options) {
        super(options);

        this.material = this.createMaterial();
        this.geometry = this.createGeometry();
        this.object = this.createMesh();

    }

    createGeometry() { return; }

    createMaterial() {
        return AssetsHandler.materials.lambert;
    }
    createMesh() {
        return new Mesh(this.geometry, this.material);
    }

    update(entity) {
        if (this.object) {
            // entity.velocity.lerp(new Vector3(), .02); // TODO: only for testing
            entity.transform.position.add(entity.velocity);
            this.object.position.copy(entity.transform.position);
            this.object.rotation.setFromVector3(entity.transform.rotation);
            this.object.scale.copy(entity.transform.scale);
        }
    }

}

export default MeshRenderComponent;
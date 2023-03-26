import { Mesh, MeshPhongMaterial, SphereGeometry } from "three";
import RigidBody from "../../game/scenes/PhysicsEngine/Actors/RigidBody";

class Sphere extends RigidBody {

    create() {
        this.geometry = new SphereGeometry(1, 10, 5);
        this.material = new MeshPhongMaterial({ color: 0xffffff });
        this.object = new Mesh(this.geometry, this.material);
    }
}

export default Sphere;
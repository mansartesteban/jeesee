import { BoxGeometry, Mesh, MeshPhongMaterial } from "three";
import RigidBody from "../../game/scenes/PhysicsEngine/Actors/RigidBody";

class Cube extends RigidBody {

    create() {
        this.geometry = new BoxGeometry(1, 1, 1);
        this.material = new MeshPhongMaterial({ color: 0xffffff });
        this.object = new Mesh(this.geometry, this.material);
    }
}

export default Cube;
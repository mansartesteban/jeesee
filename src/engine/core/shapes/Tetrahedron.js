import Actor from "@/engine/game/actors/Actor";
import { TetrahedronGeometry, Mesh, MeshPhongMaterial } from "three";

class Tetrahedron extends Actor {

    create() {
        this.geometry = new TetrahedronGeometry(1, 0);
        this.material = new MeshPhongMaterial({ color: 0xffffff });
        this.object = new Mesh(this.geometry, this.material);
    }
}

export default Tetrahedron;
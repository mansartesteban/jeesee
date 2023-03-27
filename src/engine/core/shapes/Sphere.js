import Actor from "@/engine/game/actors/Actor";
import { Mesh, MeshPhongMaterial, SphereGeometry } from "three";

class Sphere extends Actor {

    create() {
        this.geometry = new SphereGeometry(1, 10, 5);
        this.material = new MeshPhongMaterial({ color: 0xffffff });
        this.object = new Mesh(this.geometry, this.material);
    }
}

export default Sphere;
import Actor from "@/engine/game/actors/Actor";
import { BoxGeometry, Mesh, MeshPhongMaterial } from "three";

class Cube extends Actor {

    create() {
        this.geometry = new BoxGeometry(1, 1, 1);
        this.material = new MeshPhongMaterial({ color: 0xffffff });
        this.object = new Mesh(this.geometry, this.material);
    }
}

export default Cube;
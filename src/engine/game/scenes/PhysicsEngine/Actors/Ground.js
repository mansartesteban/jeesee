import Actor from "@/engine/game/actors/Actor";
import { Mesh, MeshPhongMaterial, SphereGeometry } from "three";

class Ground extends Actor {

    constructor(options) {
        super(options);
    }

    create() {

        let radius = 10;

        this.geometry = new SphereGeometry(radius, 50, 25);
        this.material = new MeshPhongMaterial({ color: "#00FF00" });
        this.object = new Mesh(this.geometry, this.material);

        console.log(this.object.position);

    }



}

export default Ground;
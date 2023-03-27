import Actor from "@/engine/game/actors/Actor";
import { GridHelper } from "three";

class Grid extends Actor {

    constructor(...props) {
        super();
        this.selectable = false;
        this.create(...props);
    }

    create(...props) {
        this.object = new GridHelper(...props);
    }
}

export default Grid;
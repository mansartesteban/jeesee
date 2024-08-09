import Entity from "@/engine/game/Entity";

class Grid extends Entity {

    constructor(...components) {
        super(...components);
        this.selectable = false;
    }

}

export default Grid;
import { Euler } from "three";

class RenderComponent {
    constructor() { }
    // update() { }
    // update(entity) {
    //     entity.object = this.object;
    // }

    update(entity) {
        this.object.position.copy(entity.position);
        this.object.rotation.setFromVector3(entity.rotation);
    }
}

export default RenderComponent;
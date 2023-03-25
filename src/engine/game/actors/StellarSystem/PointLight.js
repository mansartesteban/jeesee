import { PointLight as ThreePointLight } from "three";
import Actor from "@/engine/game/actors/Actor";

import MathUtils from "@utils/MathUtils";

class PointLight extends Actor {

    constructor(options) {
        super(options);
    }

    create() {
        this.object = new ThreePointLight(0xFFFFFF, MathUtils.random(1, 10) / 10, 1000);
        if (this.options?.position) {
            this.object.position.x = this.options.position.x;
            this.object.position.y = this.options.position.y;
            this.object.position.z = this.options.position.z;
        }


    }

    update() {
    }

}

export default PointLight;
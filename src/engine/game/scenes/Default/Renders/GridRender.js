import { GridHelper } from "three";
import RenderComponent from "../Components/RenderComponent";

class GridRender extends RenderComponent {

    options = {
        size: 12,
        divisions: 100000,
        color1: 0xffffff,
        color2: 0xffffff
    };

    createMesh() {
        this.object = new GridHelper(
            this.options.size,
            this.options.divisions,
            this.options.color1,
            this.options.color2
        );
    }

}

export default GridRender;
import { BoxGeometry, MeshPhongMaterial } from "three";

class AssetHandler {

    geometries = [];
    materials = [];

    constructor() {
        this.geometries.push(new BoxGeometry(1, 1, 1));
        this.materials.push(new MeshPhongMaterial({ color: 0xffffff }));
    }
}

export default new AssetHandler();
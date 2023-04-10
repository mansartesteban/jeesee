import { BoxGeometry, MeshLambertMaterial, MeshPhongMaterial, SphereGeometry, TetrahedronGeometry } from "three";

class AssetHandler {

    geometries = {
        cube: new BoxGeometry(1, 1, 1),
        sphere: new SphereGeometry(1, 10, 5),
        tetrahedron: new TetrahedronGeometry(1, 1)
    };
    materials = {
        lambert: new MeshLambertMaterial({ color: 0xffffff }),
        phong: new MeshPhongMaterial({ color: 0xffffff })
    };

}

export default new AssetHandler();
import Actor from "@/engine/game/actors/Actor";
import Group from "@/engine/game/actors/Group";
import Planet from "./Planet";
import Star from "./Star";

class StellarSystem extends Actor {

  constructor() {
    super();
  }

  create() {

    let grp = new Group();
    let star = new Star();

    this.add(star);

    for (let i = 0; i < 100; i++) {
      let planet = new Planet();
      this.add(planet);
    }

    this.object = grp.object;

  }

  update() {
    // this.children.forEach(child => {
    //   if (child) {

    //   }
    // })
  }

}

export default StellarSystem;

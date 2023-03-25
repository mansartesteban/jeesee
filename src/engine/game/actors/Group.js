import Actor from "@/engine/game/actors/Actor";
import { Group as ThreeGroup } from "three";

class Group extends Actor {

  constructor() {
    super();
  }

  create() {
    this.object = new ThreeGroup();
  }

}

export default Group;
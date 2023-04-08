import PhysicsComponent from "../../Components/PhysicsComponent";
import TransformComponent from "../../Components/TransformComponent";

class CarPhysics extends PhysicsComponent {

    update(entity, tick) {
        entity.velocity.x = Math.cos(tick / 50) * .1;
    }

}
export default CarPhysics;

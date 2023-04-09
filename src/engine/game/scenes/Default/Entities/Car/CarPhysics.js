import PhysicsComponent from "../../Components/PhysicsComponent";
import TransformComponent from "../../Components/TransformComponent";

class CarPhysics extends PhysicsComponent {

    options = {
        speed: .1
    };

    update(entity, tick) {
        entity.velocity.x = Math.cos(tick / 50) * this.options.speed;
    }

}
export default CarPhysics;

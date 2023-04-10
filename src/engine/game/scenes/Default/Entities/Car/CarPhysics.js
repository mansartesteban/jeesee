import PhysicsComponent from "../../Components/PhysicsComponent";
import TransformComponent from "../../Components/TransformComponent";

class CarPhysics extends PhysicsComponent {

    options = {
        speed: .1
    };

    angle = .1;

    update(entity, tick) {
        entity.velocity.x = Math.cos(tick / 50) * this.options.speed;
        entity.transform.rotation.y += this.angle;
    }

}
export default CarPhysics;

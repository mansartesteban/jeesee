import PhysicsComponent from "../../Components/PhysicsComponent";

class CarPhysics extends PhysicsComponent {

    update(entity, tick) {
        entity.position.x += Math.cos(tick / 540) * .02;
        entity.rotation.y += Math.cos(tick / 100) * .03;
    }
}
export default CarPhysics;
import PhysicsComponent from "../../Components/PhysicsComponent";

class BallPhysics extends PhysicsComponent {

    update(entity, tick) {
        entity.velocity.z = Math.cos(tick / 20) * .03;
        // entity.transform.rotation.y += Math.cos(tick / 100) * -.01;
    }

}

export default BallPhysics;

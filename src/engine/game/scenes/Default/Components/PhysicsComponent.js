class PhysicsComponent {
    update(entity, tick) {
        entity.velocity.y = Math.cos(tick / 133);
        entity.position.y = entity.velocity.y;
    }
}

export default PhysicsComponent;
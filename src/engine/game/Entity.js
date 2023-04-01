import { construct } from "core-js/fn/reflect";
import { Vector3 } from "three";

class Entity {
    constructor(...components) {
        this.position = new Vector3();
        this.rotation = new Vector3();
        this.velocity = new Vector3();

        this.components = components;
    }

    save() {
        return {
            ...this.position,
            ...this.rotation,
            ...this.velocity
        };
    }

    update() {
        this.components.forEach(component => component.update(this));
    }
}

class PhysicsComponent {
    constructor(entity) {
        this.entity = entity;
    }

    update() {
        this.entity.position.y--;
    }
}

class CarPhysics extends PhysicsComponent {
    constructor(car) {
        super(car);
    }

    update() {
        this.entity.position.x++;
    }
}

class Car extends Entity {
    constructor() {
        super();
    }
}

class Ball extends Entity {
    constructor() {
        super();
    }
}

let car = new Car(
    new CarPhysics()
);

let ball = new Ball(
    new PhysicsComponent()
);


SceneManager.add(car);
SceneManager.add(ball);

class SceneManager {
    constructor() {
        this.entities = [];
    }

    add(entity) {
        this.entities.push(entity);
    }

    update() {
        this.entities.forEach(entity => entity.update());
    }
}
// export default; 
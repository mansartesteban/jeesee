import Observer from "@/engine/core/Observer";
import { Vector3 } from "three";
import Component from "./Component";

class TransformComponent extends Component {

    #position = new Vector3();
    #rotation = new Vector3();
    #scale = new Vector3();

    position = new Proxy(this.#position, {
        get: (target, key) => {
            if (key == 'isProxy')
                return true;

            const prop = target[key];

            if (typeof prop == 'undefined')
                return;

            if (!prop.isProxy && typeof prop === 'object')
                target[key] = new Proxy(prop, this.position);

            // this.observer.$emit(TransformComponent.EVENTS.POSITION_UPDATE);
            return target[key];
        },
        set: (target, key, value) => {
            // console.log("setting position");
            target[key] = value;
            // this.observer.$emit(TransformComponent.EVENTS.POSITION_UPDATE);
            return true;
        }
    });

    rotation = new Proxy(this.#rotation, {
        get: (target, key) => {
            if (key == 'isProxy')
                return true;

            const prop = target[key];

            if (typeof prop == 'undefined')
                return;

            if (!prop.isProxy && typeof prop === 'object')
                target[key] = new Proxy(prop, this.rotation);

            // this.observer.$emit(TransformComponent.EVENTS.ROTATION_UPDATE);
            return target[key];
        },
        set: (target, key, value) => {
            target[key] = value;
            // this.observer.$emit(TransformComponent.EVENTS.ROTATION_UPDATE);
            return true;
        }
    });

    scale = new Proxy(this.#scale, {
        get: (target, key) => {
            if (key == 'isProxy')
                return true;

            const prop = target[key];

            if (typeof prop == 'undefined')
                return;

            if (!prop.isProxy && typeof prop === 'object')
                target[key] = new Proxy(prop, this.scale);

            // this.observer.$emit(TransformComponent.EVENTS.SCALE_UPDATE);
            return target[key];
        },
        set: (target, key, value) => {
            target[key] = value;
            // this.observer.$emit(TransformComponent.EVENTS.SCALE_UPDATE);
            return true;
        }
    });

    static EVENTS = Object.freeze({
        POSITION_UPDATE: "POSITION_UPDATE",
        ROTATION_UPDATE: "ROTATION_UPDATE",
        SCALE_UPDATE: "SCALE_UPDATE",
        TRANSFORM_UPDATE: "TRANSFORM_UPDATE"
    });

    observer = new Observer();

    constructor(options) {
        super(options);
        this.observer.$on(["POSITION_UPDATE", "ROTATION_UPDATE", "SCALE_UPDATE"], () => {
            this.observer.$emit(TransformComponent.EVENTS.TRANSFORM_UPDATE);
        });
    }

    update() { }

}

export default TransformComponent;
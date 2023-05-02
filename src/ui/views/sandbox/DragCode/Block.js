import { Vector2 } from "three";

class Block {

    canvas = null;
    position = new Vector2();
    size = new Vector2();

    constructor(type, title = "", position = null) {
        this.borderWidth = 1;
        this.title = title || "Empty block";
        this.type = type || "function"; // variable, for/while, if, try/catch
        this.class = "MyClass"; // The JS class linked to it

        this.selected = false;

        this.position = position || new Vector2();
        this.color = "warning";
    }

    bindCanvas(canvas) {
        this.canvas = canvas;
    }

}

export default Block;
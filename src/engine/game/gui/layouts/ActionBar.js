import Observer from "@/engine/core/Observer";
import Interfacor from "./Interfacor";

var iconStyle = ""; // TODO: préférence


// TODO: Implements DOMElement ?
class ActionBar extends Interfacor {

    options = {
        align: "right" // Left, Center, Right
    };

    actions = [];

    observer = new Observer();

    constructor(options) {
        super(options);

        this.createElement();
    }

    createElement() {
        this.node = document.createElement("div");
        this.node.classList.toggle("action-bar", true);
    }

    addAction(action) {
        if (this.node) {
            let actionButton = document.createElement("div");
            actionButton.classList.add("action-bar-button");

            if (action.icon) {
                if (!action.icon.startsWith("bi-")) {
                    action.icon = "bi-" + action.icon;
                }
                // TODO: à revoir, le système d'icones a changé
                if (action.icon.endsWith("-r") || action.icon.endsWith("-o")) {
                    action.icon = action.icon.substring(0, action.icon.length - 2);
                }
                let icon = document.createElement("i");
                icon.classList.add(action.icon + iconStyle);
                actionButton.appendChild(icon);
            }

            if (action.callback) {
                actionButton.addEventListener("click", (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    action.callback && action.callback();
                });
            }

            this.node.appendChild(actionButton);
            this.actions.push(action);
        }
    }

}

export default ActionBar;
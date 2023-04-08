import Observer from "@/engine/core/Observer";
import SceneManager from "@/engine/game/SceneManager";

class GuiControls {

  static EVENTS = Object.freeze({
    NODE_SELECTED: "NODE_SELECTED"
  });

  observer = new Observer(GuiControls.EVENTS);

  cleanTree(domElement) {
    while (domElement.firstChild) {
      domElement.removeChild(domElement.firstChild);
    }
  }

  refreshTree() {

    let controls = document.getElementById("controls");
    if (controls) {

      this.cleanTree(controls);
      let transformedDatas = this.transformEntities(SceneManager.entities, null);
      let tree = this.createTree(transformedDatas);
      controls.appendChild(tree);

    }

  }

  transformEntities(entities, parent) {
    return entities
      .filter(entity => (entity.parent && parent && entity.parent === parent.name) || !entity.parent)
      .map((entity) => {
        let children = [];
        if (entity.children) {
          children = this.transformEntities(entity.children, entity);
        }

        let tmp = {
          name: entity.constructor.name,
          label: entity.name,
          key: entity.object?.uuid || 0,
          children,
        };
        return tmp;
      });
  }

  createTree(nodes, lvl = 0) {

    let tree = document.createElement("div");
    tree.id = "entity-tree";

    nodes.forEach(node => {
      tree.appendChild(this.createTreeNode(node, lvl));
    });

    return tree;

  }

  createTreeNode(node, lvl = 0) {
    let domNode = document.createElement("div");
    domNode.classList.add("tree-node");

    let domNodeContent = document.createElement("div");
    domNodeContent.classList.add("node-content");
    domNodeContent.addEventListener("mouseenter", (e) => {
      e.stopPropagation();
      domNodeContent.classList.toggle("hovered", true);
    });
    domNodeContent.addEventListener("mouseleave", (e) => {
      e.stopPropagation();
      domNodeContent.classList.toggle("hovered", false);
    });

    if (node.children.length > 0) {
      let nodeToggleIcon = document.createElement("div");
      nodeToggleIcon.classList.add("toggle-icon");
      nodeToggleIcon.innerHTML = "<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='white' viewBox='0 0 32 32'><path d='M16.682 19.674c.01-.012.014-.028.024-.04l6.982-7.714c.39-.434.39-1.138 0-1.572-.004-.004-.008-.006-.012-.008a.936.936 0 0 0-.712-.34H8.998a.948.948 0 0 0-.722.352l-.004-.004a1.202 1.202 0 0 0 0 1.572l6.998 7.754a.928.928 0 0 0 1.412 0z'/></svg>";
      domNodeContent.appendChild(nodeToggleIcon);
      domNode.addEventListener("click", () => {
        domNode.classList.toggle("expanded");
      });
    }


    let nodeLabel = document.createElement("div");
    nodeLabel.classList.add("node-label");
    nodeLabel.innerText = "\xa0".repeat(lvl * 4) + node.name;
    domNodeContent.appendChild(nodeLabel);


    let nodeSublabel = document.createElement("div");
    nodeSublabel.classList.add("node-sublabel");
    nodeSublabel.innerText = `(ID: ${node.key})`;
    nodeSublabel.title = `ID: ${node.key}`;
    domNodeContent.appendChild(nodeSublabel);

    domNode.appendChild(domNodeContent);

    if (node.children.length > 0) {
      let childrenTree = this.createTree(node.children, lvl + 1);
      domNode.appendChild(childrenTree);
    }

    domNode.addEventListener("click", (e) => {
      e.stopPropagation();
      this.observer.$emit(GuiControls.EVENTS.NODE_SELECTED, node);
    });

    return domNode;
  }
}

export default GuiControls;
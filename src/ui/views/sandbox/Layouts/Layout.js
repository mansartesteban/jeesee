import DefaultLayout from "./DefaultLayout";


class Layout {

  options = {};
  layout = [];

  constructor(options, defaultLayout = []) {
    if (options) {
      this.options = { ...this.options, ...options };
    }

    this.layout = defaultLayout;

  }

  setLayout(layout = []) {
    this.layout = layout;
  }

  // Add handled box to the hovered one as child
  moveInside(foundElement, slotId) {
    foundElement.id = slotId + "-0";
  }

  movePreviousSameLevel(foundElement, slotId) {
    let otherBoxes = this.getBoxesAtLevel(this.layout, slotId);
    let foundIndex = otherBoxes.findIndex(box => box.id === slotId);

    // If siblings boxes exist
    if (foundIndex !== -1) {

      // For each next sibling boxes add 1 to last key id (found one included)
      for (let i = foundIndex; i < otherBoxes.length; i++) {
        let boxId = otherBoxes[i].id.split("-");
        let boxIndex = boxId.pop();
        boxId.push(+boxIndex + 1);
        otherBoxes[i].id = boxId.join("-");
      }

    }

    // Replace hovered element by handled one
    foundElement.id = slotId;
  }

  // Add both handled and hovered boxes to a new deepness level, placing the handled in first and hovering in second  
  movePreviousDeeperLevel(foundElement, slotId) {
    let parentBox = Layout.layout.find(box => box.id === slotId);
    foundElement.id = slotId + "-0";
    parentBox.id = slotId + "-1";
  }

  moveNextSameLevel(foundElement, slotId) {
    let otherBoxes = this.getBoxesAtLevel(this.layout, slotId);
    let foundIndex = otherBoxes.findIndex(box => box.id === slotId);

    // If siblings boxes exist
    if (foundIndex !== -1) {

      // For each next sibling boxes add 1 to last key id (found one excluded)
      for (let i = foundIndex + 1; i < otherBoxes.length; i++) {
        let boxId = otherBoxes[i].id.split("-");
        let boxIndex = boxId.pop();
        boxId.push(+boxIndex + 1);
        otherBoxes[i].id = boxId.join("-");
      }

    }

    // Replace hovered element by handled one
    foundElement.id = slotId.split("-");
    foundElement.id[foundElement.id.length - 1]++;
    foundElement.id = foundElement.id.join("-");
  }

  // Add both handled and hovered boxes to a new deepness level, placing the hovering in first and handled in second
  moveNextDeeperLevel(foundElement, slotId) {
    let parentBox = this.layout.find(box => box.id === slotId);
    foundElement.id = slotId + "-1";
    parentBox.id = slotId + "-0";
  }


  getBoxesAtLevel(layouts, level = "") {
    let boxParentLevel = level.split("-");
    boxParentLevel.pop();
    return layouts.filter(box => box.id.startsWith(boxParentLevel.join("-")) && box.id.split("-").length === boxParentLevel.length + 1);
  }

  placeOrCreateNode(array = [], box, previousSplittedKeys, splittedKeys) {
    if (!array[splittedKeys[0]]) {
      array[splittedKeys[0]] = {
        id: [...previousSplittedKeys, splittedKeys[0]].join("-"),
        type: "container",
        boxes: []
      };
    }

    if (splittedKeys.length > 1) {
      array[splittedKeys[0]].boxes = this.placeOrCreateNode(array[splittedKeys[0]].boxes, box, [splittedKeys[0], ...previousSplittedKeys], splittedKeys.slice(1));
    } else {
      array[splittedKeys[0]] = { ...array[splittedKeys[0]], ...box };
    }

    return array;
  }

  moveSlot(slotHovered, foundElement, slotId, isVertical) {
    if (foundElement) {
      if (slotHovered.name === "center") {
        this.moveInside(foundElement, slotId);
      }

      // If we have to add previous on the same deepness
      else if (slotHovered.name === "left" && !isVertical || slotHovered.name === "top" && isVertical) {
        this.movePreviousSameLevel(foundElement, slotId);
      }

      // If we have to add previous on the next deeper level
      else if (slotHovered.name === "left" && isVertical || slotHovered.name === "top" && !isVertical) {
        this.movePreviousDeeperLevel(foundElement, slotId);
      }

      // If we have to add next on the same deepness
      else if (slotHovered.name === "right" && !isVertical || slotHovered.name === "bottom" && isVertical) {
        this.moveNextSameLevel(foundElement, slotId);
      }

      // If we have to add next on the next deeper level
      else if (slotHovered.name === "right" && isVertical || slotHovered.name === "bottom" && !isVertical) {
        this.moveNextDeeperLevel(foundElement, slotId);
      }
    }
  }

  // TODO: Add a slot for tab container 
  createSlots(boundingBox, onlySame = false) {
    if (onlySame) {
      return [
        {
          name: "same",
          hovered: false,
          boundingBox,
        }
      ];
    }

    return [
      {
        name: "left",
        hovered: false,
        boundingBox: new DOMRect(boundingBox.left, boundingBox.top, boundingBox.width * .25, boundingBox.height),
      },
      {
        name: "right",
        hovered: false,
        boundingBox: new DOMRect(boundingBox.right - boundingBox.width * .25, boundingBox.top, boundingBox.width * .25, boundingBox.height),
      },
      {
        name: "top",
        hovered: false,
        boundingBox: new DOMRect(boundingBox.left, boundingBox.top, boundingBox.width, boundingBox.height * .25),
      },
      {
        name: "bottom",
        hovered: false,
        boundingBox: new DOMRect(boundingBox.left, boundingBox.top + boundingBox.height * .75, boundingBox.width, boundingBox.height * .25),
      },
      {
        name: "center",
        hovered: false,
        boundingBox,
      }
    ];
  }
}

export default new Layout({}, DefaultLayout);

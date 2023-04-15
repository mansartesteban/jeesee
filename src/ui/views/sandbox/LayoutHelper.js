
const moveInside = (foundElement, slotId) => {
    // Add handled box to the hovered one as child
    foundElement.id = slotId + "-0";
};

const movePreviousSameLevel = (foundElement, slotId, layouts) => {
    let otherBoxes = getBoxesAtLevel(layouts, slotId);
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
};

const movePreviousDeeperLevel = (foundElement, slotId, parentBox) => {
    // Add both handled and hovered boxes to a new deepness level, placing the handled in first and hovering in second  
    foundElement.id = slotId + "-0";
    parentBox.id = slotId + "-1";
};

const moveNextSameLevel = (foundElement, slotId, layouts) => {
    let otherBoxes = getBoxesAtLevel(layouts, slotId);
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
};

const moveNextDeeperLevel = (foundElement, slotId, parentBox) => {
    // Add both handled and hovered boxes to a new deepness level, placing the hovering in first and handled in second
    foundElement.id = slotId + "-1";
    parentBox.id = slotId + "-0";
};


const getBoxesAtLevel = (layouts, level = "") => {
    let boxParentLevel = level.split("-");
    boxParentLevel.pop();
    return layouts.filter(box => box.id.startsWith(boxParentLevel.join("-")) && box.id.split("-").length === boxParentLevel.length + 1);
};

// TODO: Add a slot for tab container 
const createSlots = (boundingBox, onlySame = false) => {
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
};

export {
    moveInside,
    movePreviousSameLevel,
    movePreviousDeeperLevel,
    moveNextSameLevel,
    moveNextDeeperLevel,
    createSlots
};
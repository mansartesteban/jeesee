const debugBoundingBox = (identifier = null, boundingRect = null, color = null) => {
    if (!identifier) {
        throw new Error("Debug boundingBox needs a identifiers to avoid duplicates");
    }

    if (!boundingRect) {
        throw new Error("Debug boundingBox needs a boundingRect object to ... well ... debug it !");
    }

    let foundDebugContainer = document.getElementById("debug-bounding-box-" + identifier);
    if (!foundDebugContainer) {
        foundDebugContainer = document.createElement("div");
        foundDebugContainer.id = "debug-bounding-box-" + identifier;
        foundDebugContainer.style.position = "fixed";
        foundDebugContainer.style.pointerEvents = "none";
        foundDebugContainer.style.border = "1px dashed " + (color || 'red');
        document.body.appendChild(foundDebugContainer);
    }
    foundDebugContainer.style.left = `${boundingRect.x}px`;
    foundDebugContainer.style.top = `${boundingRect.y}px`;

    foundDebugContainer.style.width = `${boundingRect.width}px`;
    foundDebugContainer.style.height = `${boundingRect.height}px`;

};

export {
    debugBoundingBox
};
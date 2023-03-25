import MiniVector2 from "@core/geometry/MiniVector2";
import { _BlockLayoutOptions, _BlockLayoutPosition, _GridLayoutOptions } from "@types";
import InterfaceStore from "../../storage/stores/InterfaceStore";
import BlockLayout from "./BlockLayout";
import Interfacor from "./Interfacor";

class GuiLayout extends Interfacor {

    blocks = [];

    constructor() {
        super();

        this.createElement();
    }

    createElement() {
        this.node = document.getElementById("jeesee-engine");
    }

    initialize() {
        let layoutPosition = InterfaceStore.get("layout-position");
        if (layoutPosition) {
            this.importLayout(layoutPosition);
        } else {
            this.createInitialLayout();
        }
    }

    importLayout(blocks) {
        this.clear();
        blocks.forEach((block) => {
            let blockInstance = new BlockLayout({ actionBar: block.actionBar, isMinimized: block.isMinimized });
            blockInstance.isMinimized = block.isMinimized;
            blockInstance.currentPosition = block.currentPosition;
            blockInstance.savedPosition = block.savedPosition;
            blockInstance.targetPosition = block.targetPosition;
            this.addBlock(blockInstance);
            if (block.isClosed) {
                blockInstance.close();
            }
            if (block.isMinimized) {
                blockInstance.interact?.lock();
            }
        });
    }

    save() {
        let datas = this.blocks.map(block => ({
            isMinimized: block.isMinimized,
            isClosed: block.isClosed,
            currentPosition: block.currentPosition,
            savedPosition: block.savedPosition,
            targetPosition: block.targetPosition,
            actionBar: block.options.actionBar
        }));

        InterfaceStore.save("layout-position", datas);
    }

    transformblockData(datas) {
        let transformed = {
            x: datas.from.x,
            y: datas.from.y,
            width: datas.size.x,
            height: datas.size.y
        };
        return transformed;
    }

    clear() {
        this.blocks.forEach(block => {
            if (block.node && !block.isClosed) {
                this.node?.removeChild(block.node);
            }
        });
        this.blocks.splice(0, this.blocks.length);
    }

    addBlock(block) {
        block.setLayout(this);
        this.blocks.push(block);
        if (this.node && block.node) {
            this.node.appendChild(block.node);
        }
        return this;
    }

    createInitialLayout() {
        this.addBlock(new BlockLayout({
            x: 0,
            y: 0,
            width: 100,
            height: 5,
            actionBar: false
        }));
        this.addBlock(new BlockLayout({
            x: 0,
            y: 5,
            width: 15,
            height: 95,
            actionBar: true
        }));
        this.addBlock(new BlockLayout({
            x: 15,
            y: 90,
            width: 85,
            height: 10,
            actionBar: true
        }));
        this.addBlock(new BlockLayout({
            x: 90,
            y: 5,
            width: 10,
            height: 85,
            actionBar: true
        }));
    }

    static getMouseLayoutPosition(x, y) {
        let coordinate = new MiniVector2(
            x * (100 / window.innerWidth),
            y * (100 / window.innerHeight)
        );
        if (coordinate.x > 100) coordinate.x = 100;
        if (coordinate.x < 0) coordinate.x = 0;
        if (coordinate.y > 100) coordinate.y = 100;
        if (coordinate.y < 0) coordinate.y = 0;
        return coordinate;
    }

}

export default GuiLayout;

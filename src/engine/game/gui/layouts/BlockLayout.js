import MiniVector2 from "@/engine/core/geometry/MiniVector2";
import Observer from "@/engine/core/Observer";

import ActionBar from "./ActionBar";
import Interact from "./Interact";
import Interfacor from "./Interfacor";
import MathUtils from "@/engine/utils/MathUtils";

import InterfaceStore from "@/engine/storage/stores/InterfaceStore";

class BlockLayout extends Interfacor {

	static EVENTS = Object.freeze({
		BLOCK_RESIZE: "BLOCK_RESIZE",
		BLOCK_MOVE: "BLOCK_MOVE",
		BLOCK_CLOSE: "BLOCK_CLOSE",
		BLOCK_OPEN: "BLOCK_OPEN",
		BLOCK_MINIMIZE: "BLOCK_MINIMIZE",
		BLOCK_UNMINIMIZE: "BLOCK_UNMINIMIZE",
	});

	options = {
		zIndex: 1,
		resizableX: true,
		resizableY: true,
		actionBar: false,
		snapStrength: 1.5,
		resizerSize: 12,
		animationSpeed: .15
	};

	layout = null;
	node = null;

	targetPosition = {
		from: new MiniVector2(),
		to: new MiniVector2(),
		size: new MiniVector2(),
	};

	currentPosition = JSON.parse(JSON.stringify(this.targetPosition));
	savedPosition = this.currentPosition;

	isClosed = false;
	isMinimized = false;

	observer = new Observer(BlockLayout.EVENTS);
	interact;

	constructor(options, node) {
		super();

		if (options) {
			this.options = { ...this.options, ...options };
		}

		if (this.options.x !== undefined) {
			this.targetPosition.from.x = this.options.x;
			if (this.options.width !== undefined) {
				this.targetPosition.size.x = this.options.width;
				this.targetPosition.to.x = this.options.x + this.options.width;
			}
		}

		if (this.options.y !== undefined) {
			this.targetPosition.from.y = this.options.y;
			if (this.options.height !== undefined) {
				this.targetPosition.size.y = this.options.height;
				this.targetPosition.to.y = this.options.y + this.options.height;
			}
		}

		this.node = node;


		if (this.options.resizerSize) {
			document.documentElement.style.setProperty("--a13y-resizer-size", this.options.resizerSize + "px");
		}

		this.createElement();

		window.requestAnimationFrame(this.reposition.bind(this, false));
	}

	setLayout(layout) {
		this.layout = layout;

		this.interact = new Interact(this, this.layout.blocks, { snapStrength: this.options.snapStrength });

		this.interact.makeResizable(true, true);
		// this.interact.makeMovable();
	}

	createElement() {
		this.node = this.node || document.createElement("div");
		this.node.classList.toggle("layout-block", true);
		this.node.classList.toggle("resizable", true);

		if (this.options.zIndex) {
			this.node.style.zIndex = this.options.zIndex.toString();
		}

		if (this.options.isClosed) {
			this.close();
		}

		this.createActionBar();
		this.reposition(true);

	}

	createActionBar() {

		if (this.options.actionBar !== undefined && this.options.actionBar !== false) {
			let actionBar = new ActionBar();
			this.addNode(actionBar);

			if (typeof this.options.actionBar == "boolean") {

				if (this.options.actionBar === true) {

					actionBar.addAction({
						icon: "debug",
						callback: () => {
							InterfaceStore.save("snapStrength", MathUtils.random(0, 50));
						}
					});

					actionBar.addAction({
						icon: "eye",
						callback: () => {
							console.log("get ", InterfaceStore.get("snapStrength"));
						}
					});

					actionBar.addAction({
						icon: "chevron-down",
						callback: () => {
							this.isMinimized ? this.unminimize() : this.minimize();
						}
					});

					actionBar.addAction({
						icon: "close",
						callback: () => {
							this.isClosed ? this.open() : this.close();
						}
					});

				}

			} else {
				let actionBarItems = this.options.actionBar;
				actionBarItems.forEach(item => {
					actionBar.addAction(item);
				});
			}
		}

	}

	minimize() {
		this.isMinimized = true;
		this.interact?.lock();

		this.savedPosition = JSON.parse(JSON.stringify(this.currentPosition));

		this.targetPosition.from.x = 2;
		this.targetPosition.size.x = 10;
		this.targetPosition.to.x = this.targetPosition.from.x + this.targetPosition.size.x;

		this.targetPosition.from.y = 96;
		this.targetPosition.size.y = 4;
		this.targetPosition.to.y = this.targetPosition.from.y + this.targetPosition.size.y;

		// this.observer.$emit(BlockLayout.EVENTS.BLOCK_MINIMIZE);
		// this.observer.$emit(BlockLayout.EVENTS.BLOCK_MOVE);
	}

	unminimize() {
		this.isMinimized = false;
		this.interact?.unlock();
		this.targetPosition = this.savedPosition;


		// this.observer.$emit(BlockLayout.EVENTS.BLOCK_UNMINIMIZE);
		// this.observer.$emit(BlockLayout.EVENTS.BLOCK_MOVE);
	}

	close() {

		this.isClosed = true;

		if (this.layout && this.layout.node && this.node) {
			this.layout.node.removeChild(this.node);
		}

		// this.observer.$emit(BlockLayout.EVENTS.BLOCK_CLOSE);
	}
	open() {
		this.isClosed = false;
		// this.observer.$emit(BlockLayout.EVENTS.BLOCK_OPEN);
	}

	lerp(v, a, b) {
		return a + (b - a) * v;
	}

	reposition(instant = false) { // TODO: To optimize => Recalculate position only if "move=true" ?


		if (this.node) {

			if (instant === true) {
				this.currentPosition = JSON.parse(JSON.stringify(this.targetPosition));
				if (this.layout) {
					this.layout.save();
				}
			}

			this.node.style.left = `${this.currentPosition.from.x}vw`;
			this.node.style.right = `${100 - this.currentPosition.to.x}vw`;
			this.node.style.top = `${this.currentPosition.from.y}vh`;
			this.node.style.bottom = `${100 - this.currentPosition.to.y}vh`;


			if (
				Math.abs(this.currentPosition.from.x - this.targetPosition.from.x) > 0.001
				||
				Math.abs(this.currentPosition.from.y - this.targetPosition.from.y) > 0.001
				||
				Math.abs(this.currentPosition.to.x - this.targetPosition.to.x) > 0.001
				||
				Math.abs(this.currentPosition.to.y - this.targetPosition.to.y) > 0.001

			) {
				this.currentPosition.from.x = this.lerp(this.options.animationSpeed || 1, this.currentPosition.from.x, this.targetPosition.from.x);
				this.currentPosition.from.y = this.lerp(this.options.animationSpeed || 1, this.currentPosition.from.y, this.targetPosition.from.y);
				this.currentPosition.to.x = this.lerp(this.options.animationSpeed || 1, this.currentPosition.to.x, this.targetPosition.to.x);
				this.currentPosition.to.y = this.lerp(this.options.animationSpeed || 1, this.currentPosition.to.y, this.targetPosition.to.y);
				this.currentPosition.size.x = this.currentPosition.to.x - this.currentPosition.from.x;
				this.currentPosition.size.y = this.currentPosition.to.y - this.currentPosition.from.y;
			}

			if (!instant) {
				window.requestAnimationFrame(this.reposition.bind(this, false));
			}


		}
	}

}

export default BlockLayout;

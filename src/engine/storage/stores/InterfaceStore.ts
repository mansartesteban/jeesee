import Store from "@/engine/storage/Store";

class InterfaceStore extends Store {
  constructor() {
    super(Store.STORES.INTERFACE);
  }
}

export default new InterfaceStore();
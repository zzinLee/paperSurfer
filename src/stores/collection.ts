import { create } from "zustand";
import { persist, createJSONStorage, devtools } from "zustand/middleware";

import type { CollectionStoreState } from "../types/interface";

const collectionStore = persist<CollectionStoreState>(
  (set) => ({
    collection: {},
    setCollection: (key, name) =>
      set((prev) => ({
        collection: {
          ...prev.collection,
          [key]: name
        }
      })),
    deleteCollectionFromStore: (key) =>
      set((prev) => {
        delete prev.collection[key];

        return { ...prev };
      }),
    deleteAllCollection: () =>
      set((prev) => ({
        ...prev,
        collection: {},
      }))
  }),
  {
    name: "collection-storage",
    storage: createJSONStorage(() => sessionStorage)
  }
);

const useCollectionStore = create(devtools(collectionStore));

export default useCollectionStore;

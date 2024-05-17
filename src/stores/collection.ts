import { create } from "zustand";
import { persist, createJSONStorage, devtools } from "zustand/middleware";

interface CollectionStoreState {
  collection: Record<string, string>;
  setCollection: (key: string, name: string) => void;
  deleteCollectionFromStore: (key: string) => void;
  deleteAllCollection: () => void;
}

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

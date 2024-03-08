import { create } from "zustand";
import { persist, createJSONStorage, devtools } from "zustand/middleware";

const rootCollectionStore = (set) => ({
  collection: {
    collectionName: "",
    key: 0
  },
  setCollection: (collectionName, key) =>
    set({
      collection: {
        collectionName,
        key
      }
    })
});

const collectionStore = persist(
  (set) => ({
    collectionList: [],
    setCollectionList: (newCollection) =>
      set((prev) => ({
        collectionList: [...prev.collectionList, newCollection]
      })),
    deleteCollectionList: (index) => set((prev) => {
      const deletedCollectionList = [...prev.collectionList];

      deletedCollectionList.splice(index, 1);

      return {
        collectionList: deletedCollectionList
      };
    }),
  }),
  {
    name: "collection-storage",
    storage: createJSONStorage(() => sessionStorage),
  }
);

const useCollectionStore = create(devtools(collectionStore));
const useRootCollectionStore = create(devtools(rootCollectionStore));

export {
  useCollectionStore,
  useRootCollectionStore,
};

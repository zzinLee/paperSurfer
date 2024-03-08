import { create } from "zustand";
import { devtools } from "zustand/middleware";

const collectionStore = (set) => ({
  collection: {
    collectionName: "",
    key: 0
  },
  setCollection: (collectionName, key) =>
    set({
      collection: {
        collectionName,
        key,
      }
    }),
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
});


const useCollectionStore = create(devtools(collectionStore));

export {
  useCollectionStore,
};

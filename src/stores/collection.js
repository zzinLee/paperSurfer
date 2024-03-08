import { create } from "zustand";
import { persist, createJSONStorage, devtools } from "zustand/middleware";

const collectionStore = persist(
  (set) => ({
    collection: {
      collectionName: "",
      key: 0,
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
  }),
  {
    name: "collection-storage",
    storage: createJSONStorage(() => sessionStorage),
  }
);


const useCollectionStore = create(devtools(collectionStore));

export {
  useCollectionStore,
};

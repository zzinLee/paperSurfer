import { create } from "zustand";
import { persist, createJSONStorage, devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

const paperStore = persist(
  immer((set) => ({
    paperCollection: {},
    addPaperToCollection: (key, paper) => set((state) => {
      if (state.paperCollection[key]) {
        state.paperCollection = {
          ...state.paperCollection,
          [key]: [...state.paperCollection[key], paper],
        };
      } else {
        state.paperCollection = {
          ...state.paperCollection,
          [key]: [paper],
        };
      }
    }),
    deleteAllPaperFromCollection: (key) => set((state) => {
      delete state.paperCollection[key];
    }),
    deletePaperFromCollection: (key, doi) => set((state) => {
      const deletedArray = state.paperCollection[key].filter((paper) => paper.doi !== doi);

      state.paperCollection[key] = deletedArray;
    }),
    initPaperCollection: (key, starPaperCollection) => set((state) => {
      state.paperCollection[key] = starPaperCollection;
    }),
    deleteAllPaper: () => set((state) => {
      state.paperCollection = {};
    }),
  })),
  {
    name: "paper-storage",
    storage: createJSONStorage(() => sessionStorage)
  }
);

const usePaperStore = create(devtools(paperStore));

export default usePaperStore;

import { create } from "zustand";
import { persist, createJSONStorage, devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

const paperListStore = persist(
  immer((set) => ({
    paperList: {},
    addPaper: (key, paper) => set((state) => {
      if (state.paperList[key]) {
        state.paperList = {
          ...state.paperList,
          [key]: [...state.paperList[key], paper],
        };
      } else {
        state.paperList = {
          ...state.paperList,
          [key]: [paper],
        };
      }
    }),
    deleteAllPaperList: (key) => set((state) => {
      delete state.paperList[key];
    }),
    deletePaperFromStore: (key, doi) => set((state) => {
      const deletedArray = state.paperList[key].filter((paper) => paper.doi !== doi);

      state.paperList[key] = deletedArray;
    }),
    initPaperList: (key, starPaperList) => set((state) => {
      state.paperList[key] = starPaperList;
    }),
  })),
  {
    name: "paper-storage",
    storage: createJSONStorage(() => sessionStorage)
  }
);

const usePaperListStore = create(devtools(paperListStore));

export { usePaperListStore };

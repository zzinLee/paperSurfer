import { create } from "zustand";
import { persist, createJSONStorage, devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

import { PaperInterface } from "../utils/interface";

interface PaperStoreState {
  paperCollection: Record<string, Array<PaperInterface>>;
  addPaperToCollection: (key: string, paper: PaperInterface) => void;
  deleteAllPaperFromCollection: (key: string,) => void;
  deletePaperFromCollection: (key: string, doi: string) => void;
  initPaperCollection: (key: string, starPaperCollection: Array<PaperInterface>) => void;
  deleteAllPaper: () => void;
}

const paperStore = persist(
  (set) => ({
    paperCollection: {},
    addPaperToCollection: (key: string, paper: PaperInterface) =>
      set((state: PaperStoreState) => {
        if (state.paperCollection[key]) {
          state.paperCollection = {
            ...state.paperCollection,
            [key]: [...state.paperCollection[key], paper]
          };
        } else {
          state.paperCollection = {
            ...state.paperCollection,
            [key]: [paper]
          };
        }
      }),
    deleteAllPaperFromCollection: (key: string) =>
      set((state: PaperStoreState) => {
        delete state.paperCollection[key];
      }),
    deletePaperFromCollection: (key: string, doi: string) =>
      set((state: PaperStoreState) => {
        const deletedArray = state.paperCollection[key].filter((paper: PaperInterface) => paper.doi !== doi);

        state.paperCollection[key] = deletedArray;
      }),
    initPaperCollection: (key: string, starPaperCollection: Array<PaperInterface>) =>
      set((state: PaperStoreState) => {
        state.paperCollection[key] = starPaperCollection;
      }),
    deleteAllPaper: () =>
      set((state: PaperStoreState) => {
        state.paperCollection = {};
      })
  }),
  {
    name: "paper-storage",
    storage: createJSONStorage(() => sessionStorage)
  }
);

const usePaperStore = create(immer(devtools(paperStore)));

export default usePaperStore;

export { PaperStoreState };

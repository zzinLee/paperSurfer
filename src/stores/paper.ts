import { create } from "zustand";
import { persist, createJSONStorage, devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

import { PaperConfig, PaperStoreState } from "../types/interface";

const paperStore = persist(
  (set) => ({
    paperCollection: {},
    addPaperToCollection: (key: string, paper: PaperConfig) =>
      set((state: PaperStoreState) => {
        if (state.paperCollection[key]) {
          state.paperCollection[key].push(paper);
        } else {
          state.paperCollection[key] = [paper];
        }
      }),
    deleteAllPaperFromCollection: (key: string) =>
      set((state: PaperStoreState) => {
        delete state.paperCollection[key];
      }),
    deletePaperFromCollection: (key: string, doi: string) =>
      set((state: PaperStoreState) => {
        state.paperCollection[key] = state.paperCollection[key].filter((paper: PaperConfig) => paper.doi !== doi);
      }),
    initPaperCollection: (key: string, starPaperCollection: Array<PaperConfig>) =>
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

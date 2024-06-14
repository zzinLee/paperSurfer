import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

import type { PaperConfig, PaperStoreState } from "../types/interface";

const paperStore = immer<PaperStoreState>(
  (set) => ({
    paperCollection: {},
    addPaperToCollection: (key: string, paper: PaperConfig) =>
      set((state) => {
        if (state.paperCollection[key]) {
          state.paperCollection[key].push(paper);
        } else {
          state.paperCollection[key] = [paper];
        }
      }),
    deleteAllPaperFromCollection: (key: string) =>
      set((state) => {
        delete state.paperCollection[key];
      }),
    deletePaperFromCollection: (key: string, doi: string) =>
      set((state) => {
        state.paperCollection[key] = state.paperCollection[key].filter((paper: PaperConfig) => paper.doi !== doi);
      }),
    initPaperCollection: (key: string, starPaperCollection: PaperConfig[]) =>
      set((state) => {
        state.paperCollection[key] = starPaperCollection;
      }),
    deleteAllPaper: () =>
      set((state) => {
        state.paperCollection = {};
      })
  })
);

const usePaperStore = create(
  persist(paperStore, {
    name: "paper-storage",
    storage: createJSONStorage(() => sessionStorage)
  }),
);

export default usePaperStore;

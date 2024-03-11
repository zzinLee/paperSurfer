import { create } from "zustand";
import { persist, createJSONStorage, devtools } from "zustand/middleware";

const paperListStore = persist(
  (set) => ({
    paperList: [],
    addPaperList: (paper) =>
      set((prev) => ({
        paperList: [...prev.paperList, paper]
      })),
  }),
  {
    name: "paper-storage",
    storage: createJSONStorage(() => sessionStorage)
  }
);
const usePaperListStore = create(devtools(paperListStore));

export { usePaperListStore };

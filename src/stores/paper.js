import { create } from "zustand";
import { persist, createJSONStorage, devtools } from "zustand/middleware";

const paperListStore = persist(
  (set) => ({
    addPaperList: (paper, key) =>
      set((prev) => {
        if (prev[key]) {
          return {
            ...prev,
            [key]: [...prev[key], paper]
          };
        } else {
          return {
            ...prev,
            [key]: [paper]
          };
        }
      }),
    deletePaperList: (key) =>
      set((prev) => {
        delete prev[key];

        return prev;
      })
  }),
  {
    name: "paper-storage",
    storage: createJSONStorage(() => sessionStorage)
  }
);
const usePaperListStore = create(devtools(paperListStore));

export { usePaperListStore };

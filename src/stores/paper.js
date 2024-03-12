import { create } from "zustand";
import { persist, createJSONStorage, devtools } from "zustand/middleware";

const paperListStore = persist(
  (set) => ({
    paperList: {},
    addPaperList: (paper, key) =>
      set((prev) => {
        if (prev.paperList[key]) {
          return {
            ...prev,
            paperList: {
              ...prev.paperList,
              [key]: [...prev.paperList[key], paper]
            }
          };
        } else {
          return {
            ...prev,
            paperList: {
              ...prev.paperList,
              [key]: [paper]
            }
          };
        }
      }),
    deletePaperList: (key) =>
      set((prev) => {
        delete prev.paperList[key];

        return prev;
      }),
    deleteEachPaper: (key, doi) =>
      set((prev) => {
        const deletedArray = [...prev.paperList[key]].filter((paper) => paper.doi !== doi);

        return {
          ...prev,
          paperList: {
            ...prev.paperList,
            [key]: deletedArray
          }
        };
      })
  }),
  {
    name: "paper-storage",
    storage: createJSONStorage(() => sessionStorage)
  }
);

const usePaperListStore = create(devtools(paperListStore));

export { usePaperListStore };

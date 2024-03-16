import { create } from "zustand";
import { persist, createJSONStorage, devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

function searchDoi(root, target, status) {
  if (root.doi === target.doi) {
    root.status = status;

    return root;
  }

  for (const node of root.children) {
    searchDoi(node, target, status);
  }

  return root;
}

const chartStore = persist(
  immer((set) => ({
    chartList: {},
    initChart: (root, key) =>
      set((state) => {
        state.chartList = {
          ...state.chartList,
          [key]: root
        };
      }),
    deleteCollectionChartData: (key) =>
      set((state) => {
        delete state.chartList[key];
      }),
    deletePaperChartData: (key, doi) =>
      set((state) => {
        state.chartList[key].children = state.chartList[key].children.filter((paper) => paper.doi !== doi);
      }),
    findAndChangeNodeStatus: (key, nodeData, status) =>
      set((state) => {
        state.chartList[key] = searchDoi(state.chartList[key], nodeData, status);
      })
  })),
  {
    name: "chart-storage",
    storage: createJSONStorage(() => sessionStorage)
  }
);

const useChartStore = create(devtools(chartStore));

export { useChartStore };

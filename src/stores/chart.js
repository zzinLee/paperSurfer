import { create } from "zustand";
import { persist, createJSONStorage, devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

import { STATUS } from "../utils/constants";

function searchDoi(root, target, status) {
  if (root.doi === target.doi) {
    root.status = status;

    return root;
  }

  if (root.children) {
    for (const node of root.children) {
      searchDoi(node, target, status);
    }
  }

  return root;
}

function transplantChildren(root, target, childrenList) {
  if (root.doi === target.doi) {
    root.children = childrenList;

    return root;
  }

  if (root.children) {
    for (const node of root.children) {
      transplantChildren(node, target, childrenList);
    }
  }

  return root;
}

const chartStore = persist(
  immer((set) => ({
    chartList: {},
    starList: {},
    initChart: (key, root) =>
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
      }),
    addChildrenToChart: (key, nodeData, childrenList) =>
      set((state) => {
        state.chartList[key] = transplantChildren(state.chartList[key], nodeData, childrenList);
        state.findAndChangeNodeStatus(key, nodeData, STATUS.READ);
      }),
    addStar: (key, paper) =>
      set((state) => {
        if (state.starList[key]) {
          state.starList[key] = [...state.starList[key], paper];
        } else {
          state.starList = {
            ...state.starList,
            [key]: [paper]
          };
        }
      }),
    deletePaperFromStar: (key, doi) =>
      set((state) => {
        state.starList[key] = state.starList[key].filter((paper) => paper.doi !== doi);
      }),
  })),
  {
    name: "chart-storage",
    storage: createJSONStorage(() => sessionStorage)
  }
);

const useChartStore = create(devtools(chartStore));

export { useChartStore };

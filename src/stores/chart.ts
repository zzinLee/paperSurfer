import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

import type { ChartStoreState, RootConfig, PaperConfig } from "../types/interface";

const changeTargetStatus = (root: RootConfig, target: RootConfig, status: string) => {
  if (root.doi === target.doi) {
    root.status = status;

    return root;
  }

  if (root.children) {
    for (const node of root.children) {
      changeTargetStatus(node, target, status);
    }
  }

  return root;
};

const transplantChildren = (root: RootConfig, target: RootConfig, childrenList: RootConfig[]) => {
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
};

const chartStore = immer<ChartStoreState>(
  (set) => ({
    rootCollection: {},
    starCollection: {},
    initChart: (key: string, root: RootConfig) =>
      set((state) => {
        state.rootCollection[key] = root;
      }),
    deleteCollectionFromChart: (key: string) =>
      set((state) => {
        delete state.rootCollection[key];
      }),
    deletePaperFromChart: (key: string, doi: string) =>
      set((state) => {
        state.rootCollection[key].children = state.rootCollection[key].children.filter((paper) => paper.doi !== doi);
      }),
    changeNodeStatus: (key: string, nodeData: RootConfig, status: string) =>
      set((state) => {
        state.rootCollection[key] = changeTargetStatus(state.rootCollection[key], nodeData, status);
      }),
    addChildrenToNode: (key: string, nodeData: RootConfig, childrenList: RootConfig[]) =>
      set((state) => {
        state.rootCollection[key] = transplantChildren(state.rootCollection[key], nodeData, childrenList);
      }),
    addStarPaper: (key: string, paper: PaperConfig) =>
      set((state) => {
        if (state.starCollection[key]) {
          state.starCollection[key].push(paper);
        } else {
          state.starCollection[key] = [paper];
        }
      }),
    deletePaperFromStarCollection: (key: string, doi: string) =>
      set((state) => {
        state.starCollection[key] = state.starCollection[key].filter((paper) => paper.doi !== doi);
      }),
    deleteStarCollection: (key: string) =>
      set((state) => {
        delete state.starCollection[key];
      }),
    deleteAllChart: () => {
      set((state) => {
        state.rootCollection = {};
        state.starCollection = {};
      });
    }
  })
);

const useChartStore = create(persist(chartStore, {
    name: "chart-storage",
    storage: createJSONStorage(() => sessionStorage)
  })
);

export default useChartStore;

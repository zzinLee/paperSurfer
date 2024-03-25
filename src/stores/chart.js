import { create } from "zustand";
import { persist, createJSONStorage, devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

const changeTargetStatus = (root, target, status) => {
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

const transplantChildren = (root, target, childrenList) => {
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

const chartStore = persist(
  immer((set) => ({
    rootCollection: {},
    starCollection: {},
    initChart: (key, root) =>
      set((state) => {
        state.rootCollection = {
          ...state.rootCollection,
          [key]: root
        };
      }),
    deleteCollectionFromChart: (key) =>
      set((state) => {
        delete state.rootCollection[key];
      }),
    deletePaperFromChart: (key, doi) =>
      set((state) => {
        state.rootCollection[key].children = state.rootCollection[key].children.filter((paper) => paper.doi !== doi);
      }),
    changeNodeStatus: (key, nodeData, status) =>
      set((state) => {
        state.rootCollection[key] = changeTargetStatus(state.rootCollection[key], nodeData, status);
      }),
    addChildrenToNode: (key, nodeData, childrenList) =>
      set((state) => {
        state.rootCollection[key] = transplantChildren(state.rootCollection[key], nodeData, childrenList);
      }),
    addStarPaper: (key, paper) =>
      set((state) => {
        if (state.starCollection[key]) {
          state.starCollection[key] = [...state.starCollection[key], paper];
        } else {
          state.starCollection = {
            ...state.starCollection,
            [key]: [paper]
          };
        }
      }),
    deletePaperFromStarCollection: (key, doi) =>
      set((state) => {
        state.starCollection[key] = state.starCollection[key].filter((paper) => paper.doi !== doi);
      }),
    deleteStarCollection: (key) =>
      set((state) => {
        delete state.starCollection[key];
      }),
    deleteAllChart: () => {
      set((state) => {
        state.rootCollection = {};
        state.starCollection = {};
      });
    }
  })),
  {
    name: "chart-storage",
    storage: createJSONStorage(() => sessionStorage)
  }
);

const useChartStore = create(devtools(chartStore));

export default useChartStore;

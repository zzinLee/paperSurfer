interface AuthorConfig {
  family: string;
  given: string;
}

interface CreatedConfig {
  "date-parts": string[][];
}

interface ReferenceConfig {
  DOI: string;
  author: string;
}

interface SearchResponseConfig {
  DOI: string;
  URL: string;
  author: AuthorConfig[];
  "container-title": string[];
  "is-referenced-by-count": number;
  created: CreatedConfig;
  reference: ReferenceConfig[];
  "references-count": number;
  "reference-count": number;
  title: string[];
  abstract?: string;
}

interface PaperConfig {
  author: string;
  citations: number;
  containerTitle: string;
  createdAt: string;
  doi: string;
  references: number;
  title: string;
  url: string;
  abstract?: string;
  children?: string[] | PaperConfig[];
}

interface DefaultRootConfig {
  citations: number;
  doi: string;
  status: string;
  title: string;
  author: string;
}

interface RootConfig extends DefaultRootConfig {
  createdAt?: string;
  children: RootConfig[];
}

interface InitRootConfig extends DefaultRootConfig {
  children: PaperConfig[];
}

interface PaperCollectionConfig {
  [key: string]: PaperConfig[];
}

interface DragElemConfig {
  targetString: string;
  left: number;
  top: number;
  width: number;
  height: number;
  id: string;
}

interface PaperStoreState {
  paperCollection: PaperCollectionConfig;
  addPaperToCollection: (key: string, paper: PaperConfig) => void;
  deleteAllPaperFromCollection: (key: string) => void;
  deletePaperFromCollection: (key: string, doi: string) => void;
  initPaperCollection: (key: string, starPaperCollection: PaperConfig[]) => void;
  deleteAllPaper: () => void;
}

interface CollectionStoreState {
  collection: Record<string, string>;
  setCollection: (key: string, name: string) => void;
  deleteCollectionFromStore: (key: string) => void;
  deleteAllCollection: () => void;
}

interface RootCollectionConfig {
  [key: string]: RootConfig;
}

interface StarCollectionConfig {
  [key: string]: PaperConfig[];
}

interface InitChartFunction {
  (key: string, root: RootConfig): void;
}

interface ChartStoreState {
  rootCollection: RootCollectionConfig;
  starCollection: StarCollectionConfig;
  initChart: InitChartFunction;
  deleteCollectionFromChart: (key: string) => void;
  deletePaperFromChart: (key: string, doi: string) => void;
  changeNodeStatus: (key: string, nodeData: RootConfig, status: string) => void;
  addChildrenToNode: (key: string, nodeData: RootConfig, childrenList: RootConfig[]) => void;
  addStarPaper: (key: string, paper: PaperConfig) => void;
  deletePaperFromStarCollection: (key: string, doi: string) => void;
  deleteStarCollection: (key: string) => void;
  deleteAllChart: () => void;
}

interface formattingRootFunction {
  (paper: PaperConfig[], collectionName: string): InitRootConfig;
}

export type {
  SearchResponseConfig,
  PaperStoreState,
  PaperConfig,
  ReferenceConfig,
  PaperCollectionConfig,
  DragElemConfig,
  CollectionStoreState,
  RootConfig,
  InitRootConfig,
  RootCollectionConfig,
  StarCollectionConfig,
  ChartStoreState,
  InitChartFunction,
  formattingRootFunction,
};

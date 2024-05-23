interface Author {
  family: string;
  given: string;
}

interface Created {
  "date-parts": Array<Array<string>>;
}

interface Reference {
  DOI: string;
  author: string;
}

interface SearchResponseConfig {
  DOI: string;
  URL: string;
  author: Array<Author>;
  "container-title": Array<string>;
  "is-referenced-by-count": number;
  created: Created;
  reference: Array<Reference>;
  "references-count": number;
  "reference-count": number;
  title: Array<string>;
  abstract?: string;
}

interface PaperConfig {
  authors: string;
  citations: number;
  containerTitle: string;
  createdAt: string;
  doi: string;
  references: number;
  title: string;
  url: string;
  refs?: Array<string>;
  abstract?: string;
}

interface PaperCollectionConfig {
  [key: string]: Array<PaperConfig>;
}

interface PaperStoreState {
  paperCollection: PaperCollectionConfig;
  addPaperToCollection: (key: string, paper: PaperConfig) => void;
  deleteAllPaperFromCollection: (key: string) => void;
  deletePaperFromCollection: (key: string, doi: string) => void;
  initPaperCollection: (key: string, starPaperCollection: Array<PaperConfig>) => void;
  deleteAllPaper: () => void;
}

interface CollectionStoreState {
  collection: Record<string, string>;
  setCollection: (key: string, name: string) => void;
  deleteCollectionFromStore: (key: string) => void;
  deleteAllCollection: () => void;
}

export {
  SearchResponseConfig,
  PaperStoreState, PaperConfig, PaperCollectionConfig,
  CollectionStoreState,
};

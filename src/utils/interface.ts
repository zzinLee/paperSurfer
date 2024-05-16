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

interface SearchResponse {
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

interface Paper {
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

export { SearchResponse, Paper };

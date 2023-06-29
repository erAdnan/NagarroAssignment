export interface Request {
  email: string;
  password: string;
}

export interface Parameter {
  [key: string]: string;
}

export interface GenericTopResponse {
  status: string;
  section: string;
  last_updated: string;
  num_results: number;
  results: TopStoriesResultsTypes[];
}

export interface MultiMediaTypes {
  url: string;
  format: string;
  width: number;
  height: number;
  type: string;
  subtype: string;
  caption: string;
  copyright: string;
}
export interface TopStoriesResultsTypes {
  section: string;
  subsection: string;
  title: string;
  abstract: string;
  url: string | null;
  uri: string | null;
  item_type: string;
  updated_date: string;
  created_date: string;
  published_date: string;
  multimedia: MultiMediaTypes[] | null;
}
export interface TopStoriesTypes {
  data: TopStoriesResultsTypes[];
  loading: boolean;
  moreLoading: boolean;
  error?: Error;
  isListEnd: boolean;
  pageNumber: number;
  categoryName: string;
}
export interface GenericSearchResponse {
  status: string;
  response: {
    docs: SearchArticlesTypes[];
  };
}

export interface SearchArticlesTypes {
  _id: string;
  snippet: string;
  print_page: number;
  print_section: string;
  source: string;
  web_url: string | null;
  uri: string | null;
  headline?: {
    name: string;
    sub: string;
  };
  section_name: string;
  created_date: string;
  pub_date: string;
  document_type: string;
  news_desk: string;
  multimedia: SearchMultiMediaTypes[] | null;
}
export interface SearchMultiMediaTypes {
  url: string;
  credit: string;
  width: number;
  height: number;
  type: string;
  subtype: string;
  caption: string;
  crop_name: string;
}

export interface SearchDataTypes {
  data: SearchArticlesTypes[];
  loading: boolean;
  moreLoading: boolean;
  error?: Error;
  isListEnd: boolean;
  pageNumber: number;
}

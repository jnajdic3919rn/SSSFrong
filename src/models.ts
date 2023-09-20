export interface ScrapeData {
    url: string;
    email: string;
    idToken: string;
  }

  export interface ResultsDto {
    grade: number;
    votes: number;
    numberOfComments: number;
    historyData: HistoryData[];
    positiveComments: string[];
    negativeComments: string[];
  }

  export interface HistoryData {
    type: string;
    years: number[];
    results: number[];
  }

  export interface MessageDto {
    message: string
    flag: boolean
  }
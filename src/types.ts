export interface AIResponse {
  verse: string;
  support: string;
  tips: string[];
  categories: string[];
  verseRef: string;
  quoteAuthor: string;
  tipIds: string[];
}

export interface Theme {
  isDark: boolean;
  fontSize: number;
}

export interface SavedGuidance {
  id: number;
  date: string;
  feeling: string;
  guidance: AIResponse;
}
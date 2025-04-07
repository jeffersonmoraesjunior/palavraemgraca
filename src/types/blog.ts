export interface BlogPost {
  slug: string;
  headline: string;
  content: string;
  date: string;
  datePublished: string;
  author: string;
  description: string;
  tags: string[];
  imageUrl?: string;
} 
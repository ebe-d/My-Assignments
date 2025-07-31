// Export as named exports for better ESM compatibility
type ContentType = 'article' | 'youtube' | 'twitter' | 'image' | 'pdf' | 'note' | 'link' | 'other';

interface Content {
  _id: string;
  type: ContentType;
  title: string;
  description?: string;
  url?: string;
  content?: string;
  imageUrl?: string;
  isFavorite: boolean;
  share: boolean;
  createdAt: string;
  updatedAt: string;
  userId: string;
  link?: string; // For backward compatibility
}

export type { Content, ContentType };

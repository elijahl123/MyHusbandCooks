import { Timestamp } from 'firebase/firestore';

export interface Post {
  id?: string; // Optional ID for referencing the document in Firestore
  title: string;
  content: string; // Rich text content
  authorId: string; // Reference to the author's User ID
  coverImageUrl?: string;
  timestamp: Timestamp; // Timestamp for sorting comments
  likes?: string[];
}

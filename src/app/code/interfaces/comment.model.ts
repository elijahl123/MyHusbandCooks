import { Timestamp } from 'firebase/firestore';


export interface Comment {
  id?: string; // Optional ID for referencing the document in Firestore
  content: string;
  authorId: string; // Reference to the author's User ID
  timestamp: Timestamp; // Timestamp for sorting comments
}

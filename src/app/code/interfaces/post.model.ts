export interface Post {
  id?: string; // Optional ID for referencing the document in Firestore
  title: string;
  content: string; // Rich text content
  authorId: string; // Reference to the author's User ID
  authorName?: string; // Optional author name for display purposes
}

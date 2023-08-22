import { Injectable } from '@angular/core';
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc, getDoc } from 'firebase/firestore';
import { db } from '../../app.module';
import { Post } from '../interfaces/post.model';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor() { }

  private static toPost(doc: any): Post {
    return {
      id: doc.id,
      title: doc.data().title,
      content: doc.data().content,
      authorId: doc.data().authorId,
      authorName: doc.data().authorName // If you have this field
    };
  }


  async createPost(post: Post) {
    const postsRef = collection(db, 'posts');
    const postRef = await addDoc(postsRef, post);
    return postRef.id; // Return the new post's ID
  }

  async getPosts(): Promise<Post[]> {
    const postsRef = collection(db, 'posts');
    const postSnapshot = await getDocs(postsRef);
    return postSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Post));
  }

  async getPost(id: string): Promise<Post | null> {
    const postRef = doc(db, 'posts', id);
    const postDoc = await getDoc(postRef);
    return postDoc.exists() ? { id: postDoc.id, ...postDoc.data() } as Post : null;
  }

  async updatePost(post: Post) {
    const postRef = doc(db, 'posts', post.id);
    await updateDoc(postRef, post);
  }

  async deletePost(id: string) {
    const postRef = doc(db, 'posts', id);
    await deleteDoc(postRef);
  }
}

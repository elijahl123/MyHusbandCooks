import { Injectable } from '@angular/core';
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc, getDoc, Timestamp } from 'firebase/firestore';
import { app, db } from '../../app.module';
import { Post } from '../interfaces/post.model';
import { Comment } from '../interfaces/comment.model';
import { getAuth } from 'firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor() { }


  async createPost(post: Post) {
    const user = getAuth(app).currentUser;
    if (user) {
      post.authorId = user.uid; // Set the author ID from the current user
    }
    post.timestamp = Timestamp.fromDate(new Date());
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
    const postRef = doc(db, 'posts', post.id!);
    await updateDoc(postRef, post as Partial<Post>);
  }

  async deletePost(id: string) {
    const postRef = doc(db, 'posts', id);
    await deleteDoc(postRef);
  }

  // Comment Methods

  async createComment(postId: string, comment: Comment) {
    const user = getAuth(app).currentUser;
    if (user) {
      comment.authorId = user.uid; // Set the author ID from the current user
    }
    const commentsRef = collection(db, 'posts', postId, 'comments');
    comment.timestamp = Timestamp.fromDate(new Date());
    const commentRef = await addDoc(commentsRef, comment);
    return commentRef.id; // Return the new comment's ID
  }

  async getComments(postId: string): Promise<Comment[]> {
    const commentsRef = collection(db, 'posts', postId, 'comments');
    const commentSnapshot = await getDocs(commentsRef);
    return commentSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Comment));
  }

  async updateComment(postId: string, comment: Comment) {
    const commentRef = doc(db, 'posts', postId, 'comments', comment.id!);
    await updateDoc(commentRef, comment as Partial<Comment>);
  }

  async deleteComment(postId: string, commentId: string) {
    const commentRef = doc(db, 'posts', postId, 'comments', commentId);
    await deleteDoc(commentRef);
  }
}

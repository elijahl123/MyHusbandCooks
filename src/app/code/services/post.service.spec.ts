import { TestBed } from '@angular/core/testing';
import { PostService } from './post.service';
import { Timestamp } from 'firebase/firestore';

describe('PostService', () => {
  let service: PostService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PostService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // Test for createPost method
  it('should create a post', async () => {
    const post = {
      title: 'Test Title',
      content: 'Test Content',
      authorId: 'Test Author ID'
    };
    const postId = await service.createPost(post);
    expect(postId).toBeDefined();
    // Additional assertions based on your Firestore setup
  });

  // Test for getPosts method
  it('should retrieve posts', async () => {
    const posts = await service.getPosts();
    expect(posts).toBeDefined();
    // Additional assertions based on your Firestore setup
    console.log(posts);
  });

  // Test for getPost method
  it('should retrieve a specific post', async () => {
    const posts = await service.getPosts();
    const postId = posts[0].id!;
    const post = await service.getPost(postId);
    expect(post).toBeDefined();
    // Additional assertions based on your Firestore setup
    console.log(post);
  });

  // Test for updatePost method
  it('should update a post', async () => {
    const posts = await service.getPosts();
    const postId = posts[0].id!;
    const post = {
      id: postId, // Replace with a valid post ID
      title: 'Updated Title',
      content: 'Updated Content',
      authorId: 'Updated Author ID'
    };
    await service.updatePost(post);
    // Additional assertions based on your Firestore setup
  });

  // Test for createComment method
  it('should create a comment', async () => {
    const posts = await service.getPosts();
    const postId = posts[0].id!;
    const comment = {
      content: 'Test Content',
      authorId: 'Test Author ID',
      timestamp: Timestamp.fromDate(new Date())
    };
    const commentId = await service.createComment(postId, comment);
    expect(commentId).toBeDefined();
    // Additional assertions based on your Firestore setup
  });

  // Test for getComments method
  it('should retrieve comments for a post', async () => {
    const posts = await service.getPosts();
    const postId = posts[0].id!;
    const comments = await service.getComments(postId);
    expect(comments).toBeDefined();
    // Additional assertions based on your Firestore setup
    console.log(comments);
  });

  // Test for updateComment method
  it('should update a comment', async () => {
    const posts = await service.getPosts();
    const postId = posts[0].id!;
    const comments = await service.getComments(postId);
    const commentId = comments[0].id!;
    const comment = {
      id: commentId,
      content: 'Updated Content',
      authorId: 'Updated Author ID',
      timestamp: Timestamp.fromDate(new Date())
    };
    await service.updateComment(postId, comment);
    // Additional assertions based on your Firestore setup
  });

  // Test for deleteComment method
  it('should delete a comment', async () => {
    const posts = await service.getPosts();
    const postId = posts[0].id!;
    const comments = await service.getComments(postId);
    const commentId = comments[0].id!;
    await service.deleteComment(postId, commentId);
    // Additional assertions based on your Firestore setup
  });

  // Test for deletePost method
  it('should delete a post', async () => {
    // Get the first post in the collection's ID
    const posts = await service.getPosts();
    const postId = posts[0].id!;
    await service.deletePost(postId);
    // Additional assertions based on your Firestore setup
  });
});

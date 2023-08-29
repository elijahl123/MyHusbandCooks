import { Component, Input, OnInit } from '@angular/core';
import { Comment } from '../../interfaces/comment.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PostService } from '../../services/post.service';
import { getAuth } from 'firebase/auth';
import { app } from '../../../app.module';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {
  @Input() postId!: string;
  comments: Comment[] = [];
  commentForm: FormGroup;
  commentUsers: { [uid: string]: string } = {};
  isLoggedIn = false;

  constructor(private postService: PostService, private fb: FormBuilder, private router: Router, private authService: AuthService) {
    this.commentForm = this.fb.group({
      content: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.postService.getComments(this.postId).then(comments => {
      this.comments = comments;
      comments.forEach(comment => {
        this.getUserNameById(comment.authorId).then(name => {
          this.commentUsers[comment.authorId] = name;
        });
      });
    });
    const auth = getAuth(app);
    auth.onAuthStateChanged(user => {
      this.isLoggedIn = !!user;
    });
  }

  async addComment() {
    const user = getAuth(app).currentUser;
    if (user) {
      if (!this.commentForm.valid) {
        return;
      }
      const comment: Comment = this.commentForm.value;
      await this.postService.createComment(this.postId, comment);
      this.commentForm.reset();
      this.ngOnInit(); // Reload comments
    } else {
      // Handle the case where the user is not authenticated
      this.router.navigate(['/login']);
    }
  }

  // Methods to edit or delete comments for authenticated users or superusers
  async getUserNameById(authorId: string) {
    // returns the First and Last name of the user
    const user = await this.authService.getUserById(authorId);
    return `${user.firstName} ${user.lastName}`;
  }
}

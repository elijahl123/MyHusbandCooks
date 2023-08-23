import { Component, Input, OnInit } from '@angular/core';
import { Comment } from '../../interfaces/comment.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PostService } from '../../services/post.service';
import { getAuth } from 'firebase/auth';
import { app } from '../../../app.module';
import { Router } from '@angular/router';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {
  @Input() postId!: string;
  comments: Comment[] = [];
  commentForm: FormGroup;

  constructor(private postService: PostService, private fb: FormBuilder, private router: Router) {
    this.commentForm = this.fb.group({
      content: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.postService.getComments(this.postId).then(comments => {
      this.comments = comments;
    });
  }

  async addComment() {
    const user = getAuth(app).currentUser;
    if (user) {
      const comment: Comment = this.commentForm.value;
      comment.authorId = user.uid; // Set the author ID from the current user
      await this.postService.createComment(this.postId, comment);
      this.commentForm.reset();
      this.ngOnInit(); // Reload comments
    } else {
      // Handle the case where the user is not authenticated
      this.router.navigate(['/login']);
    }
  }

  // Methods to edit or delete comments for authenticated users or superusers
}

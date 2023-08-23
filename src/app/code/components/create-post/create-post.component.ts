import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PostService } from '../../services/post.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from '../../interfaces/post.model';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent implements OnInit {
  postForm: FormGroup;
  postId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private postService: PostService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.postForm = this.fb.group({
      title: ['', Validators.required],
      content: ['', Validators.required]
      // Add author or other fields if needed
    });
  }

  ngOnInit(): void {
    this.postId = this.route.snapshot.paramMap.get('id');
    if (this.postId) {
      this.postService.getPost(this.postId).then(post => {
        if (post) {
          this.postForm.setValue({
            title: post.title,
            content: post.content
            // Set other fields if needed
          });
        }
      });
    }
  }

  async savePost() {
    const post: Post = this.postForm.value;
    if (this.postId) {
      post.id = this.postId;
      await this.postService.updatePost(post);
    } else {
      await this.postService.createPost(post);
    }
    this.router.navigate(['/']); // Redirect to the post list
  }
}

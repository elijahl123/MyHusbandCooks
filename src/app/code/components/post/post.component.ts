import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from '../../interfaces/post.model';
import { PostService } from '../../services/post.service';
import { faChevronDown, faChevronLeft, faEdit, faHeart, faTrash } from '@fortawesome/pro-solid-svg-icons';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { AuthService } from '../../services/auth.service';
import { Location } from '@angular/common';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { app } from '../../../app.module';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  post: Post | null = null;
  chevronLeft: IconDefinition = faChevronLeft;
  chevronDown: IconDefinition = faChevronDown;
  editIcon: IconDefinition = faEdit;
  deleteIcon: IconDefinition = faTrash;
  heart: IconDefinition = faHeart;
  authorName: string = '';
  isSuperUser: boolean = false;
  likedPost: boolean = false;

  constructor(private postService: PostService, private route: ActivatedRoute, private authService: AuthService, private location: Location, private router: Router) {
  }

  ngOnInit(): void {
    const postId = this.route.snapshot.paramMap.get('id');
    if (postId) {
      this.postService.getPost(postId).then(post => {
        this.post = post;
        this.getUserNameById(post!.authorId).then(name => {
          this.authorName = name;
        });
        this.authService.getUser().then(async user => {
          if (user) {
            const userData = await this.authService.getUser();
            this.isSuperUser = userData?.superuser || false;
            this.likedPost = post?.likes?.includes(user.id) || false;
          } else {
            this.isSuperUser = false;
          }
        });
      });
    }
  }

  async getUserNameById(authorId: string) {
    // returns the First and Last name of the user
    const user = await this.authService.getUserById(authorId);
    return `${user.firstName} ${user.lastName}`;
  }

  back() {
    this.location.back()
  }

  deletePost() {
    if (this.post) {
      this.postService.deletePost(this.post.id!).then(() => {
        this.location.back();
      });
    }
  }

  async likePost() {
    const user = await this.authService.getUser();
    if (user && this.post) {
      await this.postService.likePost(this.post.id!, user.id);
      // Refresh the post or update the UI as needed
    } else {
      // Redirect to log in
      await this.router.navigate(['/login']);
    }
  }

  async unlikePost() {
    const user = await this.authService.getUser();
    if (user && this.post) {
      await this.postService.unlikePost(this.post.id!, user.id);
      // Refresh the post or update the UI as needed
    } else {
      // Redirect to log in
      await this.router.navigate(['/login']);
    }
  }

}

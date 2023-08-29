import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  isSuperUser: any;

  constructor(private postService: PostService, private route: ActivatedRoute, private authService: AuthService, private location: Location) {
  }

  ngOnInit(): void {
    const postId = this.route.snapshot.paramMap.get('id');
    if (postId) {
      this.postService.getPost(postId).then(post => {
        this.post = post;
        this.getUserNameById(post!.authorId).then(name => {
          this.authorName = name;
        });
      });
    }
    const auth = getAuth(app);
    onAuthStateChanged(auth, async user => {
      if (user) {
        const userData = await this.authService.getUser();
        this.isSuperUser = userData?.superuser || false;
      } else {
        this.isSuperUser = false;
      }
    });
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
}

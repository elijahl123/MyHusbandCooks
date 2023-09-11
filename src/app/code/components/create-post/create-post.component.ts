import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PostService } from '../../services/post.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from '../../interfaces/post.model';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { app } from '../../../app.module';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CreatePostComponent implements OnInit {
  postForm: FormGroup;
  postId: string | null = null;
  selectedFile: File | null = null;

  constructor(
    private fb: FormBuilder,
    private postService: PostService,
    private route: ActivatedRoute,
    private router: Router,
  )
  {
    this.postForm = this.fb.group({
      title: ['', Validators.required],
      content: ['', Validators.required]
    });
    if (this.route.snapshot.paramMap.get('id')) {
      this.postForm.addControl('coverImage', this.fb.control(''));
    }
  }

  ngOnInit(): void {
    this.postId = this.route.snapshot.paramMap.get('id');
    if (this.postId) {
      this.postService.getPost(this.postId).then(post => {
        if (post) {
          this.postForm.patchValue({
            title: post.title,
            content: post.content
          });
        }
      });
    }
  }

  async savePost() {
    const post: Post = this.postForm.value;

    if (this.selectedFile) {
      // Initialize Firebase Storage
      const storage = getStorage(app);

      // Create a storage reference and upload task
      const filePath = `cover-images/${new Date().getTime()}_${this.selectedFile.name}`;
      const fileRef = ref(storage, filePath);
      const task = uploadBytesResumable(fileRef, this.selectedFile);

      await new Promise<void>((resolve, reject) => {
        task.on('state_changed',
          () => {},
          (error) => {
            // Handle unsuccessful uploads
            console.error('Upload error:', error);
            reject();
          },
          async () => {
            // Handle successful uploads on complete
            const downloadURL = await getDownloadURL(fileRef);
            console.info('File available at', downloadURL);
            // Save the download URL to your Post model
            post.coverImageUrl = downloadURL;
            resolve();
          }
        );
      });
    }

    if (this.postId) {
      post.id = this.postId;
      await this.postService.updatePost(post);
    } else {
      await this.postService.createPost(post);
    }
    this.router.navigate(['/']).then( () => {
      // Alert the user that the post was saved
      alert('Post saved successfully!');
    });
  }


  handleFileInput(event: Event) {
    this.selectedFile = (event.target as HTMLInputElement).files?.[0] || null;
  }


}

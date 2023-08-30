import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './code/routing/app-routing.module';
import { AppComponent } from './code/components/app.component';
import { HeaderComponent } from './code/components/header/header.component';
import { HomeComponent } from './code/components/home/home.component';
import { CreatePostComponent } from './code/components/create-post/create-post.component';
import { PostComponent } from './code/components/post/post.component';
import { LoginComponent } from './code/components/login/login.component';
import { RegisterComponent } from './code/components/register/register.component';
import { environment } from '../environments/environment';
import { getAnalytics } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';
import * as firebase from 'firebase/app';
import { ReactiveFormsModule } from '@angular/forms';
import { getFirestore } from 'firebase/firestore';
import { AccountComponent } from './code/components/account/account.component';
import { PostListComponent } from './code/components/post-list/post-list.component';
import { QuillConfigModule, QuillEditorComponent } from 'ngx-quill';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { CommentComponent } from './code/components/comment/comment.component';
import { StripTagsPipe } from './code/pipes/strip-tags.pipe';
import { TruncatePipe } from './code/pipes/truncate.pipe';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FooterComponent } from './code/components/footer/footer.component';

export const app = firebase.initializeApp(environment.firebase);
export const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app)

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    CreatePostComponent,
    PostComponent,
    LoginComponent,
    RegisterComponent,
    AccountComponent,
    PostListComponent,
    CommentComponent,
    StripTagsPipe,
    TruncatePipe,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    ReactiveFormsModule,
    QuillConfigModule.forRoot({
      modules: {
        syntax: false,
        toolbar: [
          ['bold', 'italic', 'underline', 'strike'],
          ['blockquote', 'code-block'],
          [{ list: 'ordered' }, { list: 'bullet' }],
          [{ header: [1, 2, 3, 4, 5, 6, false] }],
          [{ color: [] }, { background: [] }],
          ['link'],
          ['clean'],
          ['image', 'video']
        ]
      }
    }),
    QuillEditorComponent,
    FontAwesomeModule,
    NgOptimizedImage,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}

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
import { getAuth } from "firebase/auth";
import * as firebase from 'firebase/app';
import { ReactiveFormsModule } from '@angular/forms';
import { getFirestore } from 'firebase/firestore';
import { AccountComponent } from './code/components/account/account.component';
import { AuthGuard } from './code/guards/auth-guard.guard';

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
    AccountComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
  ],
  providers: [
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}

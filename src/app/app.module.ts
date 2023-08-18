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

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    CreatePostComponent,
    PostComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

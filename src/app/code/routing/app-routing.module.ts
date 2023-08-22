import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from '../components/register/register.component';
import { HomeComponent } from '../components/home/home.component';
import { CreatePostComponent } from '../components/create-post/create-post.component';
import { PostComponent } from '../components/post/post.component';
import { LoginComponent } from '../components/login/login.component';
import { AuthGuard } from '../guards/auth-guard.guard';
import { AccountComponent } from '../components/account/account.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'create', component: CreatePostComponent },
  { path: 'post/:id', component: PostComponent },
  { path: 'edit/:id', component: CreatePostComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'account', component: AccountComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { UserProfileComponent } from './auth/user-profile/user-profile.component';
import { HomeComponent } from './home/home.component';
import { CreatePostComponent } from './post/create-post/create-post.component';
import { UpdatePostComponent } from './post/update-post/update-post.component';
import { ViewPostComponent } from './post/view-post/view-post.component';

const routes: Routes = [
  {path: 'home',component:HomeComponent},
  {path: 'user-profile/:username', component:UserProfileComponent},
  {path: 'update-post/:id', component:UpdatePostComponent},
  {path:'create-post',component:CreatePostComponent},
  {path: 'sign-up',component:SignupComponent},
  {path: 'login',component:LoginComponent},
  {path : 'view-post/:id',component:ViewPostComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

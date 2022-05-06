import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { SignupComponent } from './auth/signup/signup.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {NgxWebstorageModule} from 'ngx-webstorage';
import { LoginComponent } from './auth/login/login.component';
import { HomeComponent } from './home/home.component';
import { TokenInterceptor } from './auth/token-interceptor';
import { PostSectionComponent } from './shared/post-section/post-section.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { ExploreSidebarComponent } from './shared/explore-sidebar/explore-sidebar.component';
import { TimeagoIntl, TimeagoModule } from 'ngx-timeago';
import { ReversePipe } from './pipe/reverse.pipe';
import { ViewPostComponent } from './post/view-post/view-post.component';
import { LoginValidatorDirective } from './shared/validators/login-validator.directive';
import { CreatePostComponent } from './post/create-post/create-post.component';
import { UpdatePostComponent } from './post/update-post/update-post.component';
import { UpdateCommentComponent } from './comment/update-comment/update-comment.component';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { UserProfileComponent } from './auth/user-profile/user-profile.component';
import {OverlayModule} from '@angular/cdk/overlay';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SignupComponent,
    LoginComponent,
    HomeComponent,
    PostSectionComponent,
    SidebarComponent,
    ExploreSidebarComponent,
    ReversePipe,
    ViewPostComponent,
    LoginValidatorDirective,
    CreatePostComponent,
    UpdatePostComponent,
    UpdateCommentComponent,
    UserProfileComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    TimeagoModule.forRoot(),
    NgxWebstorageModule.forRoot(),
    AngularEditorModule,
    OverlayModule,
  ],
  providers: [    {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true
  },TimeagoIntl],
  bootstrap: [AppComponent],
  entryComponents:[]
})
export class AppModule { }

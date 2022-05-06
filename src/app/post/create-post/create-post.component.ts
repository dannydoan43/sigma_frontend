import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { AuthenticationService } from 'src/app/auth/authentication.service';
import { PostsService } from 'src/app/shared/posts.service';
import { PostPayload } from './post-payload';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {

  createPostForm:FormGroup=this.fb.group({});
  postPayload:PostPayload;
  currentUser:string='';
  constructor(private fb:FormBuilder, private postService:PostsService, private authService:AuthenticationService,private router:Router) { 
    this.postPayload = {
      text: '',
      username:'',
      title:''
    };
  }

  ngOnInit(): void {
    this.createPostForm=this.fb.group({
      text: ['',[Validators.required]],
      title:['',[Validators.required]]
    });
    this.currentUser=this.authService.getUserName();
  }

  createPost(){
    this.postPayload.likeCount=0;
    this.postPayload.liked=false;
    this.postPayload.text=this.createPostForm.get('text')?.value;
    this.postPayload.title=this.createPostForm.get('title')?.value;
    this.postPayload.username=this.currentUser;

    this.postService.createPost(this.postPayload).subscribe({
      next:(v) => {
        this.router.navigateByUrl('home');
      }, error : (e) => {
        throwError(()=>e);
      }
    })
  }

  closePost(){
    this.router.navigateByUrl('home');
  }

}

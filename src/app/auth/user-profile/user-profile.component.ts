import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { throwError } from 'rxjs';
import { CommentRequest } from 'src/app/comment/comment-request';
import { CommentService } from 'src/app/comment/comment.service';
import { PostsModel } from 'src/app/shared/posts-model';
import { PostsService } from 'src/app/shared/posts.service';
import { UsersModel } from 'src/app/shared/users-model';
import { UsersService } from 'src/app/shared/users.service';
import { UserPayload } from './user-payload';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  updateUserForm:FormGroup=this.fb.group({});
  userPayload:UserPayload;
  user:UsersModel;
  currentUser:string='';
  posts:PostsModel[]=[];
  comments:CommentRequest[]=[];
  showPost:boolean=false;
  showComments:boolean=false;
  showSettings:boolean=false;

  constructor(private activatedRoute:ActivatedRoute,private commentService: CommentService, 
    private postService: PostsService,private fb:FormBuilder,
    private userService:UsersService,private router:Router) {
    this.currentUser=this.activatedRoute.snapshot.params['username'];


    this.user = {
      description:'',
      firstName:'',
      lastName:'',
      password:'',
      username:'',
    }

    this.userPayload = {
      email:'',
      description: '',
      firstName: '',
      lastName:'',
      password: '',
      username: ''
    }
   }

  ngOnInit(): void {
    this.postService.getPostsByUsername(this.currentUser).subscribe({
      next:(v)=>{
        this.posts=v;
      }, error:(e) =>{
        throwError(()=>e);
      }
    });

    this.commentService.getCommentsByUser(this.currentUser).subscribe({
      next:(v)=>{
        this.comments=v;
      }, error:(e) =>{
        throwError(()=>e);
      }
    });
    this.activatedRoute.params.subscribe({
      next:(v)=>{
        let name = v['username'];
        console.log("THIS IS THE USERNAME GIVEN" + name);
        this.userService.getUserByUsername(name).subscribe({
          next:(n)=>{
            this.user=n;
            this.updateUserForm.get('description')?.setValue(n.description);
            this.updateUserForm.get('firstName')?.setValue(n.firstName);
            this.updateUserForm.get('lastName')?.setValue(n.lastName);
            this.updateUserForm.get('password')?.setValue(n.password);
            this.updateUserForm.get('username')?.setValue(n.username);

          },error:(e) => {
            throwError(()=>e);
          }
        })
      },error:(e)=>{
        throwError(()=>e);
      }
    })
    this.createForm();
  }

  updateUser() {
    this.userPayload.email=this.user.email!;
    this.userPayload.description=this.updateUserForm.get('description')?.value;
    this.userPayload.firstName=this.updateUserForm.get('firstName')?.value;
    this.userPayload.lastName=this.updateUserForm.get('lastName')?.value;
    this.userPayload.password=this.updateUserForm.get('password')?.value;
    this.userPayload.username=this.updateUserForm.get('username')?.value;

    this.userService.updateUser(this.userPayload).subscribe({next:(v)=>{
      this.router.navigateByUrl('home');
    },error:(e)=>{
      throwError(()=>e);
    }});
  }

  createForm(){
    this.updateUserForm=this.fb.group({
      description:['',[Validators.required]],
      firstName:['',[Validators.required]],
      lastName:['',[Validators.required]],
      password:['',[Validators.required]],
      username:['',[Validators.required]]
    })
  }

  displayPosts() {
    this.showPost=true;
    this.showComments=false;
    this.showSettings=false;
  }

  displayComments() {
    this.showPost=false;
    this.showComments=true;
    this.showSettings=false;
  }

  displaySettings() {
    this.showPost=false;
    this.showComments=false;
    this.showSettings=true;
  }
}

import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { tap, throwError } from 'rxjs';
import { PostsModel } from 'src/app/shared/posts-model';
import { PostsService } from 'src/app/shared/posts.service';
import { PostPayload } from '../create-post/post-payload';

@Component({
  selector: 'app-update-post',
  templateUrl: './update-post.component.html',
  styleUrls: ['./update-post.component.css']
})
export class UpdatePostComponent implements OnInit {
  updatePostForm:FormGroup=this.fb.group({});
  postPayload:PostPayload;
  postId:number;
  post:PostsModel = {likeCount:0,liked:false,text:'',username:'',title:''};

  constructor(private fb:FormBuilder,private postService:PostsService,private activatedRoute:ActivatedRoute,private router:Router) { 
    this.postId=this.activatedRoute.snapshot.params['id'];
    this.postPayload = {
       text: '',
       username:'',
       title:''
     };
  }

  ngOnInit(): void {
    // this.postId=this.activatedRoute.snapshot.params['id'];
    this.getPostbyId();
    // // console.log(this.post.text); //NO VALUE
    this.createForm();
    // this.postService.getPostById(this.postId).pipe(tap(post=>this.updatePostForm.patchValue(post)));
    this.activatedRoute.params.subscribe({
      next:(v) => {
        let id = v['id'];
        this.postService.getPostById(id).subscribe({
          next:(v) => {
            this.post=v;
            console.log("this is inside posts inside " + this.post.username);
            // this.postId=post.id!      //used exclamation point here...
            this.updatePostForm.get('text')?.setValue(v.text);
            this.updatePostForm.get('title')?.setValue(v.title);
          }, error:(e) => {
            throwError(()=>e);
          }}
        )
      },error:(e)=>{
        throwError(()=>e);
      }}
    );
    this.createForm();
    console.log("this is inside posts after init " + this.post.username);
  }

  createForm(){
    this.updatePostForm=this.fb.group({
      text: ['',[Validators.required]],
      title:['',[Validators.required]]
    });
    console.log("INSIDE CREATEFORM" + this.post.id); //NO VALUE

  }

  updatePost() {
    this.postPayload.id=this.post.id;
    this.postPayload.likeCount=this.post.likeCount;
    this.postPayload.liked=this.post.liked;
    this.postPayload.text=this.updatePostForm.get('text')?.value;
    this.postPayload.title=this.updatePostForm.get('title')?.value;
    this.postPayload.username=this.post.username;

    this.postService.updatePost(this.postPayload).subscribe({next:(v)=>{
      console.log("updated post");
      this.router.navigateByUrl('home');
    },error:(e)=>{
      throwError(()=>e);
    }});
  }

  private getPostbyId(){
    this.postService.getPostById(this.postId).subscribe({next:(v)=> {
      this.post=v;
      console.log(this.post.text);  //this gets the value...why cant i pass it around?
    },error : (e) => {
      throwError(()=>e);
    }})
  }

  closePost(){
    this.router.navigateByUrl('home');
  }
  
editorConfig: AngularEditorConfig = {
  editable: true,
    spellcheck: true,
    height: '20rem',    //need to use rem
    minHeight: '0',
    maxHeight: 'auto',
    width: 'auto',
    minWidth: '0',
    translate: 'yes',
    enableToolbar: true,
    showToolbar: true,
    placeholder: 'Enter text here...',
    defaultParagraphSeparator: '',
    defaultFontName: '',
    defaultFontSize: '',
    fonts: [
      {class: 'arial', name: 'Arial'},
      {class: 'times-new-roman', name: 'Times New Roman'},
      {class: 'calibri', name: 'Calibri'},
      {class: 'comic-sans-ms', name: 'Comic Sans MS'}
    ],
    customClasses: [
    {
      name: 'quote',
      class: 'quote',
    },
    {
      name: 'redText',
      class: 'redText'
    },
    {
      name: 'titleText',
      class: 'titleText',
      tag: 'h1',
    },
  ],
  uploadUrl: 'v1/image',
  // upload: (file: File) => {  },
  uploadWithCredentials: false,
  sanitize: false,   //if your program stops getting white background turn this to false
  toolbarPosition: 'top',
  toolbarHiddenButtons: [
    ['bold', 'italic'],
    ['fontSize'],
  ]
};
}

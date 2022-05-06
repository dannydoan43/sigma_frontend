import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { throwError } from 'rxjs';
import { AuthenticationService } from 'src/app/auth/authentication.service';
import { CommentRequest } from 'src/app/comment/comment-request';
import { CommentService } from 'src/app/comment/comment.service';
import { PostsModel } from 'src/app/shared/posts-model';
import { PostsService } from 'src/app/shared/posts.service';

@Component({
  selector: 'app-view-post',
  templateUrl: './view-post.component.html',
  styleUrls: ['./view-post.component.css']
})
export class ViewPostComponent implements OnInit {

  postId:number;
  post:PostsModel = {likeCount:0,liked:false,text:'',username:'',title:''};
  commentForm:FormGroup=this.fb.group({});
  updateCommentForm:FormGroup=this.fb.group({});
  commentPayload:CommentRequest;
  comments:CommentRequest[] =[];
  username:string='';
  email:string='';
  updateCom:boolean=false;
  commentToUpdate:number=0;
  message:string='';

  constructor(private postService:PostsService,private activatedRoute:ActivatedRoute,private commentService:CommentService,private router:Router,private fb:FormBuilder,
    private authService:AuthenticationService) {
    this.postId=this.activatedRoute.snapshot.params['id'];
    
    this.commentPayload = {
      postsId: this.postId,
      message : '',
      username:'',
    }
   }

  ngOnInit(): void {
    this.username=this.authService.getUserName();
    this.getPostbyId();
    this.getCommentsForPost();
    this.updateCommentForm = this.fb.group({
      message :['',[Validators.required]],
    });
    this.commentForm = this.fb.group({
      message :['',[Validators.required]],
    });
  }

  private getPostbyId(){
    this.postService.getPostById(this.postId).subscribe({next:(v)=> {
      this.post=v;
    },error : (e) => {
      throwError(()=>e);
    }})
  }

  private getCommentsForPost(){
    this.commentService.getCommentsByPostId(this.postId).subscribe({next:(v)=> {
      this.comments=v;
    },error : (e) => {
      throwError(()=>e);
    }})
  }
  postComment() {
    this.commentPayload.message = this.commentForm.get('message')?.value;
    this.commentPayload.username=this.username;
    this.commentService.addCommentToPost(this.commentPayload).subscribe({next :(v) => {
      this.commentForm.get('message')?.setValue('');
      this.getCommentsForPost();
    }, error : (e) => {
      
      throwError(()=> e);
    }})
  }

  changeCommentVar(id:number) {
    this.updateCom = !this.updateCom;
    this.commentToUpdate=id;
    console.log(this.comments[0].message);
    this.comments.forEach( obj => {
      if(obj.id == this.commentToUpdate) {
        this.message=obj.message;
      }
    })
    this.updateCommentForm.get('message')?.setValue(this.message);

  }

  updateComment() {
    this.commentPayload.message = this.updateCommentForm.get('message')?.value;
    this.commentPayload.id = this.commentToUpdate;
    this.commentPayload.username = this.username;

    this.commentService.updateComment(this.commentPayload).subscribe({
      next:(v) => {
        console.log("updated comment");
        this.router.navigate(['/view-post/',this.postId]).then(()=>window.location.reload());
      }, error:(e)=>{
        throwError(()=>e);
        console.log("good job shitter");
      }
    })
  }

  deleteComment(id:number) {
    this.commentService.deleteComment(id).subscribe({next:(v)=>{
      console.log("deleted comment");
      this.router.navigate(['/view-post/',this.postId]).then(()=>window.location.reload());
    },error:(e)=>{
      throwError(()=>e);
    }});
  }

  discardChanges() {
    this.updateCom=false;
  }

  goBack() {
    this.router.navigateByUrl('home');
    console.log("cmon...");
  }

  editorConfig: AngularEditorConfig = {
    editable: true,
      spellcheck: true,
      height: '5rem',    //need to use rem
      minHeight: '0',
      maxHeight: 'auto',
      width: 'auto',
      minWidth: '0',
      translate: 'yes',
      enableToolbar: true,
      showToolbar: true,
      placeholder: 'Your thoughts...?',
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
    uploadWithCredentials: false,
    sanitize: false,
    toolbarPosition: 'top',
    toolbarHiddenButtons: [
      ['justifyCenter',
    'strikeThrough',
    'subscript',
    'superscript',
    'justifyLeft',
    'justifyCenter',
    'justifyRight',
    'justifyFull',
    'insertUnorderedList',
    'insertOrderedList',
    'heading',
    'fontName'],
    ['fontSize','textColor',
    'backgroundColor',
    'customClasses','insertHorizontalRule',
    'removeFormat','toggleEditorMode'],
    ]
  };
}

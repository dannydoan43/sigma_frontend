import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TimeagoIntl } from 'ngx-timeago';
import { PostsModel } from '../posts-model';
import {strings as englishStrings} from 'ngx-timeago/language-strings/en'
import { PostsService } from '../posts.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PostPayload } from 'src/app/post/create-post/post-payload';
import { AuthenticationService } from 'src/app/auth/authentication.service';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-post-section',
  templateUrl: './post-section.component.html',
  styleUrls: ['./post-section.component.css']
})
export class PostSectionComponent implements OnInit {

  @Input() posts: PostsModel[] = [];
  loggedInMatchesCreator:boolean=false;
  currentUser:string='';

  constructor(private router:Router,intl:TimeagoIntl,private authService:AuthenticationService,private postService:PostsService) { 
    intl.strings=englishStrings;
    intl.changes.next();
  }

  ngOnInit(): void {
    this.currentUser=this.authService.getUserName();
  }

  deletePost(id:number) {
    this.postService.deletePost(id).subscribe({
      next:(v)=>{
        console.log("deleted post");
        this.router.navigate(['/home']).then(()=>window.location.reload());
      },error:(e)=>{
        throwError(()=>e);
      }
    })
  }

  goToUpdate(id:number): void {
    this.router.navigateByUrl('/update-post/' + id);
  }

  goToPost(id:number):void {
    this.router.navigateByUrl('/view-post/' + id);
  }

}

import { Component, OnInit } from '@angular/core';
import { PostsModel } from '../shared/posts-model';
import { PostsService } from '../shared/posts.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  posts : Array<PostsModel> = [];

  constructor(private postsService: PostsService) { 
    
   
  }

  ngOnInit(): void {
    this.postsService.getAllPosts().subscribe({ next : (n) => {this.posts=n}, error : (e) => {console.log(e);console.log("nice one")}});
  }

}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PostPayload } from '../post/create-post/post-payload';
import { PostsModel } from './posts-model';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(private http:HttpClient) { }

  getAllPosts():Observable<Array<PostsModel>> {
    return this.http.get<Array<PostsModel>>('http://localhost:3333/posts/all')
  }

  getPostById(postId:number):Observable<PostsModel> {
    return this.http.get<PostsModel>('http://localhost:3333/posts/get/' + postId);
  }

  getPostsByUsername(username:string): Observable<PostsModel[]> {
    return this.http.get<PostsModel[]>('http://localhost:3333/posts/getUser/' + username)
  }

  createPost(postPayload:PostPayload): Observable<any> {
    return this.http.post('http://localhost:3333/posts/add/', postPayload);
  }

  updatePost(postPayload:PostPayload): Observable<any> {
    return this.http.put('http://localhost:3333/posts/update/', postPayload);
  }

  deletePost(id:number) {
    return this.http.delete('http://localhost:3333/posts/delete/'+id);
  }
}

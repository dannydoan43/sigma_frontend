import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CommentRequest } from './comment-request';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private http: HttpClient) { }

  getCommentsByPostId(postId:number):Observable<CommentRequest[]> {
    return this.http.get<CommentRequest[]>('http://localhost:3333/comments/getC/' + postId);
  }

  addCommentToPost(commentRequest:CommentRequest):Observable<any> {
    return this.http.post<any>('http://localhost:3333/comments/addC/',commentRequest);
  }

  getCommentsByUser(username:string) {
    return this.http.get<CommentRequest[]>('http://localhost:3333/comments/getUser/' + username);
  }

  updateComment(commentPayload:CommentRequest) {
    return this.http.put('http://localhost:3333/comments/update/' , commentPayload,{responseType:'text'});
  }

  deleteComment(id:number) {
    return this.http.delete('http://localhost:3333/comments/delete/'+id);
  }
}

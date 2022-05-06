export interface CommentRequest {
    id?:number;
    postsId:number;
    message:string;
    username:string;
    createdAt?:Date;
}

export interface PostsModel {
    id?:number;
    createdAt?:Date;
    likeCount:number;
    liked:boolean;
    text:string;
    username:string;
    title:string;
}

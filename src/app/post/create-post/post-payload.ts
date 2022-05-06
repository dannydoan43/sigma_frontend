export interface PostPayload {
    id?:number;
    likeCount?:number;
    liked?: boolean;
    text: string;
    username:string;
    title:string;
}

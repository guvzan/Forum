export declare class UserProfileDto {
    id: number;
    name?: string;
    email: string;
    roleId: number;
    avatar: string;
    isActivated: boolean;
    lastLogin: Date;
    createdAt: Date;
    posts: Array<object>;
    comments: Array<object>;
    postLikes: Array<object>;
    commentLikes: Array<object>;
}

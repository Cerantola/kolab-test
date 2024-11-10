export interface IFeed {
    userId: number;
    id: number;
    title: string;
    body: string;
    image?: string;
    isOpenComments: boolean;
    liked: boolean;
}

export interface IComment {
    id: number;
    postId: number;
    name: string;
    email: string;
    body: string;
}

export interface ICommentEdit {
    id: number;
    text: string;
}
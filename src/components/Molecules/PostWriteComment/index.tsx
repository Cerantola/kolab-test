import { FormEvent, useEffect, useState } from "react";
import { IComment, ICommentEdit } from "../../../interfaces/IFeed";
import { postAuthorImage } from "../../../utils/feed";
import { userLogged } from "../../../utils/constants";

interface IProps {
    postId: number;
    comments: IComment[];
    setComments: (comments: IComment[]) => void;
    commentEdit: ICommentEdit | null;
    setCommentEdit: (comment: ICommentEdit | null) => void;
}

function PostWriteComment({ postId, comments, setComments, commentEdit, setCommentEdit }: IProps) {
    const [text, setText] = useState('');

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const copy = [...comments];

        if (commentEdit?.id) {
            const index = copy.findIndex(elem => elem.id === commentEdit?.id);
            copy[index].body = text;
        } else {
            copy.push({
                postId,
                id: copy?.length + 2,
                name: '',
                email: userLogged?.email,
                body: text,
            });
        }

        setComments(copy);
        setText('');
        setCommentEdit(null);
    }

    useEffect(() => {
        if (!commentEdit) return;

        setText(commentEdit?.text);
    }, [commentEdit?.id]);

    return (
        <form onSubmit={onSubmit}>
            <div className="w-full flex md:gap-5 gap-2">
                <img
                    alt="user"
                    src={postAuthorImage[userLogged.id]}
                    width={40}
                    height={40}
                    className="w-10 h-10 rounded-full object-cover"
                />

                <input
                    type="text"
                    placeholder="Deixe um comentário"
                    value={text}
                    autoComplete="off"
                    className="flex-1 h-10 px-5 appearance-none outline-none bg-zinc-100 text-sm text-neutral-600 placeholder-neutral-600 rounded-md"
                    onChange={({ target }) => setText(target.value)}
                />

                <button disabled={!text} className="w-[75px] h-10 flex items-center justify-center text-white bg-yellow-500 rounded-md disabled:opacity-60">
                    Enviar
                </button>
            </div>
        </form>
    );
}

export {PostWriteComment};
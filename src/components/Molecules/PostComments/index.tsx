import { useEffect, useState } from "react";
import { useUser } from "../../../hooks/Users";
import { postAuthorImage } from "../../../utils/feed";
import { BounceLoader } from "react-spinners";
import { PostWriteComment } from "../PostWriteComment";
import { Dropdown } from "../../Atoms";
import { IComment, ICommentEdit } from "../../../interfaces/IFeed";

interface IProps {
    id: number;
    isOpen: boolean;
}

function PostComments({ id, isOpen }: IProps) {
    const { users } = useUser();
    const [loading, setLoading] = useState(false);
    const [comments, setComments] = useState<IComment[]>([]);
    const [commentEdit, setCommentEdit] = useState<ICommentEdit | null>(null);

    const handleDelete = (index: number) => {
        const copy = [...comments];
        copy.splice(index, 1);

        setComments(copy);
    }

    const getUserData = (_id: number) => {
        const randomNumber = _id > 10 ? 10 : _id;
        const found = users?.find(user => user.id === randomNumber);

        return {
            name: found?.name ?? '',
            image: found?.id ? postAuthorImage[found?.id] : '',
        }
    }

    const getComments = async () => {
        try {
            setLoading(true);

            const res = await fetch(`https://jsonplaceholder.typicode.com/comments?postId=${id}`);

            if (!res.ok) {
                setLoading(false);
                return;
            }

            const data = await res.json();

            setComments(data);
            setLoading(false);
        } catch (error) {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (!isOpen) return;

        void getComments();
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <>
            <div className="w-full flex flex-col md:px-10 px-0 gap-5">
                {comments?.map((item, index) => {
                    const user = getUserData(index + 1);

                    return (
                        <div key={item?.id} className="w-full flex md:gap-5 gap-2">
                            <img
                                alt="user"
                                src={user?.image}
                                width={40}
                                height={40}
                                className="w-10 h-10 rounded-full object-cover"
                            />

                            <div className="flex-1 flex items-start p-2 gap-2 bg-zinc-100 rounded-md">
                                <p className="flex-1 text-sm text-neutral-600">
                                    <strong>{user?.name}:</strong> {item?.body}
                                </p>

                                <Dropdown
                                    options={[
                                        { label: 'Editar', onClick: () => setCommentEdit({ id: item.id, text: item.body }) },
                                        { label: 'Deletar', onClick: () => handleDelete(index) },
                                    ]}
                                />
                            </div>
                        </div>
                    )
                })}
            </div>

            {loading && (
                <div className="w-full flex flex-col items-center justify-center mt-5 gap-2">
                    <BounceLoader color="#A0A0A0" size={30} />

                    <p className="text-sm text-neutral-600">
                        Carregando comentários
                    </p>
                </div>
            )}

            <PostWriteComment
                postId={id}
                comments={comments}
                setComments={setComments}
                commentEdit={commentEdit}
                setCommentEdit={setCommentEdit}
            />
        </>
    )
}

export { PostComments };
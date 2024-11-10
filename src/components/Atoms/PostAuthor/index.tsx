import { useUser } from "../../../hooks/Users";
import { postAuthorImage } from "../../../utils/feed";

interface IProps {
    userId: number;
}

function PostAuthor({ userId }: IProps) {
    const { users } = useUser();
    const found = users?.find(user => user.id === userId);

    return (
        <a href={`/profile/${found?.id}`} className="flex items-center gap-4">
            <img
                alt=""
                src={postAuthorImage[userId]}
                width={40}
                height={40}
                className="w-10 h-10 rounded-full object-cover"
            />

            <span className="text-base text-neutral-600 font-semibold">
                {found?.name}
            </span>
        </a>
    );
}

export { PostAuthor };
import { PostReactionButton } from "../../Atoms";
import { IFeed } from "../../../interfaces/IFeed";

interface IProps {
    index: number;
    feed: IFeed[];
    setFeed: (feed: IFeed[]) => void;
}

function PostReaction({ index, feed, setFeed }: IProps) {
    const handleClickButton = (type: 'favorite' | 'comments') => {
        const copy = [...feed];

        switch (type) {
            case "favorite":
                copy[index].liked = !copy[index].liked;
                break;

            case "comments":
                copy[index].isOpenComments = !copy[index].isOpenComments;
                break;
        }

        setFeed(copy);
    }

    return (
        <div className="w-full flex items-center justify-between px-5">
            <PostReactionButton
                icon="favorite"
                checked={feed[index]?.liked}
                onClick={() => handleClickButton('favorite')}
            />

            <PostReactionButton
                icon="chat_bubble"
                onClick={() => handleClickButton('comments')}
            />

            <PostReactionButton
                icon="share"
                onClick={() => {}}
            />
        </div>
    )
}

export { PostReaction };
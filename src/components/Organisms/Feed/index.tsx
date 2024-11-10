import { useCallback, useEffect, useState } from "react";
import { IFeed } from "../../../interfaces/IFeed";
import { Separator } from "../../Atoms";
import { Post, PostComments, PostReaction } from "../../Molecules";
import { userLogged } from "../../../utils/constants";
import Skeleton from "../../Skeletons/PostSkeleton";
import { usePublicationModal } from "../../../hooks/PublicationModal";

interface IProps {
    id?: number;
}

function Feed({ id }: IProps) {
    const { publicationEvent, setPublicationEvent } = usePublicationModal();
    const [feed, setFeed] = useState<IFeed[]>([]);
    const [loading, setLoading] = useState(false);
    const owner = id ? id === userLogged.id : false;

    const updateFeed = useCallback(() => {
        if (!publicationEvent) return;

        const copy = [...feed];
        const index = copy.findIndex(elem => elem.id === publicationEvent?.id);

        if (index !== -1) {
            copy[index] = publicationEvent;
        } else {
            const id = Math.floor(Math.random() * (5000 - 2000 + 1)) + 2000;

            copy.unshift({
                ...publicationEvent,
                id,
                userId: userLogged.id
            });
        }

        setFeed(copy);
        setPublicationEvent(null);
    }, [feed, publicationEvent]);

    const getFeed = async () => {
        try {
            setLoading(true);

            const url = id ? `https://jsonplaceholder.typicode.com/posts?userId=${id}` : 'https://jsonplaceholder.typicode.com/posts';

            const res = await fetch(url);

            if (!res.ok) {
                setLoading(false);
                return;
            }

            const data = await res.json();

            setFeed(data);
            setLoading(false);
        } catch (error) {
            setLoading(false);
        }
    }

    useEffect(() => {
        void getFeed();
    }, [id]);

    useEffect(() => {
        if (!publicationEvent) return;

        void updateFeed();
    }, [publicationEvent]);

    return (
        <div className="w-full flex flex-col gap-5">
            {!loading && feed?.length === 0 && (
                <span className="w-full text-neutral-600 text-center py-5">
                    Nenhuma publicação encontrada.
                </span>
            )}

            <h2 className="text-neutral-600 text-2xl">{owner ? 'Minhas publicações' : 'Publicações'}</h2>

            {loading && (
                <Skeleton />
            )}

            {feed?.map((item, index) => (
                <div key={item?.id} className="w-full flex flex-col p-5 gap-5 bg-white rounded-md shadow-md">
                    <Post item={item} feed={feed} setFeed={setFeed} />

                    <Separator />

                    <PostReaction index={index} feed={feed} setFeed={setFeed} />

                    <Separator />

                    <PostComments id={item?.id} isOpen={item?.isOpenComments} />
                </div>
            ))}
        </div>
    );
}

export { Feed };
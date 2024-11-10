import { Dropdown, PostAuthor, Separator } from "../../Atoms";
import { IFeed } from "../../../interfaces/IFeed";
import { userLogged } from "../../../utils/constants";
import { postImage } from "../../../utils/feed";
import { usePublicationModal } from "../../../hooks/PublicationModal";

interface IProps {
    item: IFeed;
    feed: IFeed[];
    setFeed: (feed: IFeed[]) => void;
}

function Post({ item, feed, setFeed }: IProps) {
    const { showPublicationModal } = usePublicationModal();
    const owner = item?.userId === userLogged?.id;

    const handleDelete = () => {
        const copy = [...feed];
        const index = feed.findIndex(elem => elem.id === item.id);
        copy.splice(index, 1);

        setFeed(copy);
    }

    const handleEdit = () => {
        showPublicationModal({
            id: item?.id,
            text: item?.body,
            image: postImage[item?.id] ?? item?.image,
        });
    }

    return (
        <>
            <div className="w-full flex items-center justify-between gap-2">
                <PostAuthor userId={item?.userId}/>

                {owner && (
                    <Dropdown
                        options={[
                            { label: 'Editar', onClick: () => handleEdit() },
                            { label: 'Deletar', onClick: () => handleDelete() },
                        ]}
                    />
                )}
            </div>

            <Separator/>

            <div className="flex flex-col gap-2">
                <span className="text-sm text-neutral-600 font-semibold">{item?.title}</span>
                <p className="text-sm text-neutral-600">{item?.body}</p>
            </div>

            {(postImage[item?.id] || item?.image) && (
                <img
                    alt={item?.title}
                    src={item?.image ?? postImage[item?.id]}
                    width={100}
                    height={300}
                    className="w-full h-[300px] md:h-[479px] object-contain"
                />
            )}
        </>
    );
}

export {Post};
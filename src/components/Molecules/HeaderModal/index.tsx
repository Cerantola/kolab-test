import { useMemo } from "react";
import { PostAuthor } from "../../Atoms";
import { userLogged } from "../../../utils/constants";
import { IFeed } from "../../../interfaces/IFeed";
import { usePublicationModal } from "../../../hooks/PublicationModal";

interface IProps {
    close: () => void;
    publication: IFeed;
    setPublication: (publication: IFeed) => void;
}

function HeaderModal({ close, publication, setPublication }: IProps) {
    const { setPublicationEvent } = usePublicationModal();

    const onSubmit = () => {
        setPublicationEvent(publication);
        setPublication({} as IFeed);
        close();
    }

    const isDisabled = useMemo(() => {
        return !publication?.body && !publication?.image;
    }, [publication]);

    return (
        <div className="w-full flex items-center justify-between">
            <div className="flex items-center gap-2">
                <button onClick={close}>
                    <i className="material-symbols-outlined mat-icon text-neutral-600">arrow_back</i>
                </button>

                <PostAuthor userId={userLogged.id}/>
            </div>

            <button onClick={onSubmit} disabled={isDisabled} className="w-20 h-10 flex items-center justify-center bg-yellow-500 rounded-full disabled:opacity-35">
                <i className="material-symbols-outlined mat-icon text-white">send</i>
            </button>
        </div>
    );
}

export { HeaderModal };
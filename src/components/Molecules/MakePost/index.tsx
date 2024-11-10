import { Separator } from "../../Atoms";
import { usePublicationModal } from "../../../hooks/PublicationModal";
import { postAuthorImage } from "../../../utils/feed";
import { userLogged } from "../../../utils/constants";

function MakePost() {
    const { showPublicationModal } = usePublicationModal();

    return (
        <button
            className="hidden w-full md:flex flex-col p-5 gap-5 bg-white rounded-md cursor-pointer shadow-md"
            aria-label="Criar publicação"
            onClick={() => showPublicationModal()}
        >
            <div className="w-full flex gap-3">
                <img
                    alt=""
                    src={postAuthorImage[userLogged.id]}
                    width={40}
                    height={40}
                    className="w-10 h-10 rounded-full object-cover"
                />

                <div
                    className="w-full flex items-center gap-2 flex-1 h-10 px-4 bg-zinc-100 rounded-md">
                    <span
                        className="w-full bg-zinc-100 text-left text-base text-neutral-600">
                        Criar publicação
                    </span>
                </div>
            </div>

            <Separator/>

            <div className="flex items-center gap-2">
                <i className="material-symbols-outlined mat-icon text-neutral-600">perm_media</i>
                <span className="text-base text-neutral-600">Mídia</span>
            </div>
        </button>
    );
}

export { MakePost };
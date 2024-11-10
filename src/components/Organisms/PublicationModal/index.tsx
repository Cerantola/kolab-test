import { useEffect, useState } from "react";
import { IPublicationEdit } from "../../../interfaces/IPublication";
import { Modal, Separator } from "../../Atoms";
import { HeaderModal, UploadMedia } from "../../Molecules";
import { IFeed } from "../../../interfaces/IFeed";
import { userLogged } from "../../../utils/constants";
import {postImage} from "../../../utils/feed";

interface IProps {
    open: boolean;
    close: () => void;
    editPublication?: IPublicationEdit;
}

function PublicationModal({ open, close, editPublication }: IProps) {
    const [publication, setPublication] = useState<IFeed>({} as IFeed);

    const handleDeleteMedia = () => {
        setPublication({ ...publication, image: '' });

        if (publication?.id) {
            postImage[publication?.id] = '';
        }
    }

    const onChangeMedia = (image: string) => {
        setPublication({ ...publication, image });
    }

    useEffect(() => {
        if (open && editPublication) {
            setPublication({
                ...publication,
                body: editPublication?.text,
                image: editPublication?.image,
                userId: userLogged.id,
                id: editPublication?.id,
            });
        }
    }, [editPublication, open]);

    return (
        <Modal open={open}>
            <div className="w-full h-full flex flex-col p-5 gap-5">
                <HeaderModal
                    close={close}
                    publication={publication}
                    setPublication={setPublication}
                />

                <Separator />

                <textarea
                    rows={4}
                    placeholder="Criar nova publicação"
                    className="appearance-none outline-none w-full h-28 p-5 bg-zinc-100 rounded-md text-base text-neutral-600 placeholder-neutral-600 resize-none"
                    value={publication.body}
                    onChange={({ target }) => setPublication({ ...publication, body: target.value })}
                />

                {publication?.image ? (
                    <div className="flex-1 flex items-center justify-center border border-neutral-200 rounded-md">
                        <div className="w-[200px] relative">
                            <img
                                alt="preview"
                                src={publication?.image}
                                width={200}
                                height={200}
                                className="w-[200px] h-[200px] object-cover rounded-md"
                            />

                            <button
                                onClick={handleDeleteMedia}
                                className="w-8 h-8 flex items-center justify-center rounded-full bg-neutral-200 border-2 border-white absolute z-10 -top-3 -right-3 p-2"
                            >
                                <i className="material-symbols-outlined mat-icon text-neutral-600">close</i>
                            </button>
                        </div>
                    </div>
                ) : (
                    <UploadMedia onChange={onChangeMedia}/>
                )}
            </div>
        </Modal>
    );
}

export { PublicationModal };
import { ChangeEvent, useState } from "react";
import { profileCoverImage } from "../../../utils/profile";
import { ProfileAvatar } from "../ProfileAvatar";

interface IProps {
    id: number;
    owner: boolean;
}

function ProfileCover({ id, owner }: IProps) {
    const [loading, setLoading] = useState(false);
    const [image, setImage] = useState<string>(profileCoverImage[id]);

    const handleUpload = async (e: ChangeEvent<HTMLInputElement>) => {
        setLoading(true);

        e.preventDefault();

        if (e.target.files && e.target.files.length > 0) {
            const reader = new FileReader();

            reader.addEventListener("load", () => {
                setImage(reader.result as string);
            });

            reader.readAsDataURL(e.target.files[0]);
        }

        setLoading(false);
    };

    return (
        <div className="relative w-full h-[204px] rounded-t-lg bg-gray-500">
            <img
                alt="Cover"
                src={image}
                width="100"
                height="204"
                className={`w-full h-[204px] rounded-t-lg object-cover ${
                    loading && "bg-gray-400 animate-pulse"
                }`}
            />

            <div className="w-full absolute z-10 top-0 flex items-start justify-between p-5 gap-2 rounded-t-lg bg-gradient">
                <div className="flex items-center gap-2">
                    <button className="md:hidden block">
                        <i className="material-symbols-outlined mat-icon text-white">arrow_back</i>
                    </button>
                </div>

                {owner && (
                    <div className='flex flex-col gap-5 items-end'>
                        <div className="flex items-center gap-2">
                            <label
                                htmlFor="fileUploadCover"
                                className="relative flex items-center justify-center w-[122px] h-7 rounded-md text-white text-base font-normal bg-zinc-300 bg-opacity-40 cursor-pointer"
                            >
                                Trocar capa
                                <input
                                    id="fileUploadCover"
                                    type="file"
                                    accept="image/*"
                                    onChange={handleUpload}
                                    className="hidden"
                                />
                            </label>
                        </div>
                    </div>
                )}
            </div>

            <ProfileAvatar id={id} owner={owner} />
        </div>
    );
}

export {ProfileCover};
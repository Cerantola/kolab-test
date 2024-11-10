import { ChangeEvent, useState } from "react";
import { postAuthorImage } from "../../../utils/feed";

interface IProps {
    id: number;
    owner: boolean;
}

function ProfileAvatar({ id, owner }: IProps) {
    const [loading, setLoading] = useState(false);
    const [image, setImage] = useState<string>(postAuthorImage[id]);

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
        <div className={`absolute z-20 left-5 -bottom-[50px] w-[115px] h-[115px] flex items-center justify-center bg-white rounded-full`}>
            <div className="w-[108px] h-[108px] rounded-full">
                <div className="relative w-[108px] h-[108px]">
                    <img
                        alt="Avatar"
                        src={image}
                        width="108"
                        height="108"
                        className={`w-[108px] h-[108px] rounded-full object-cover ${
                            loading && "bg-gray-400 animate-pulse"
                        }`}
                    />

                    {owner && (
                        <div className="absolute !z-40 -right-2 -bottom-2 w-[48px] h-[48px] rounded-full border-2 border-white bg-zinc-100">
                            <label
                                htmlFor="fileUploadAvatar"
                                className="w-full h-full flex relative flex-col items-center justify-center cursor-pointer"
                            >
                                <i className="material-symbols-outlined mat-icon text-neutral-600">photo_camera</i>

                                <input
                                    id="fileUploadAvatar"
                                    type="file"
                                    accept="image/*"
                                    onChange={handleUpload}
                                    className="hidden"
                                />
                            </label>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export {ProfileAvatar};
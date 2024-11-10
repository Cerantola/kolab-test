import { ChangeEvent, useEffect, useState } from "react";

interface IProps {
    onChange: (file: string) => void;
}

function UploadMedia({ onChange }: IProps) {
    const [file, setFile] = useState('');

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();

        if (e.target.files && e.target.files.length > 0) {
            const reader = new FileReader();

            reader.addEventListener("load", () => {
                setFile(reader.result as string);
            });

            reader.readAsDataURL(e.target.files[0]);
        }
    }

    useEffect(() => {
        if (!file) return;

        void onChange(file);
    }, [file]);

    return (
        <label
            htmlFor="fileUpload"
            className="flex-1 flex relative flex-col items-center justify-center border border-neutral-200 rounded-md cursor-pointer text-neutral-300"
        >
            <i className="material-symbols-outlined mat-icon text-[40px]">perm_media</i>

            Clique aqui para selecionar sua mídia

            <input
                id="fileUpload"
                type="file"
                accept="image/*"
                onChange={handleChange}
                className="opacity-0 absolute cursor-pointer"
            />
        </label>
    )
}

export {UploadMedia};
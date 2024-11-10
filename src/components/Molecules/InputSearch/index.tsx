import { useState } from "react";
import { useUser } from "../../../hooks/Users";
import { IUser } from "../../../interfaces/IUser";
import { PostAuthor } from "../../Atoms";

function InputSearch() {
    const { users } = useUser();
    const [search, setSearch] = useState('');
    const [results, setResults] = useState<IUser[]>([]);

    const handleSearch = (value: string) => {
        setSearch(value);

        const found = users?.filter((user) => user?.name?.includes(value));

        setResults(found);
    }

    return (
        <>
            <form
                onSubmit={(e) => e.preventDefault()}
                className="w-full h-10 flex items-center px-4 gap-2 bg-zinc-100 rounded-md"
            >
                <i className="material-symbols-outlined mat-icon text-neutral-600">search</i>

                <input
                    type="text"
                    placeholder="Buscar usuários"
                    value={search}
                    autoComplete="off"
                    className="w-full appearance-none outline-none bg-zinc-100 text-base text-neutral-600 placeholder-neutral-600"
                    onChange={({ target }) => handleSearch(target.value)}
                />
            </form>

            {search && (
                <div className="absolute z-40 md:top-20 top-[150px] left-0 w-full flex justify-center">
                    <div className="w-full max-w-screen-md max-h-80 flex flex-col p-5 gap-5 bg-white rounded-md shadow-md overflow-y-auto">
                        {results?.length === 0 && (
                             <span className="w-full text-neutral-600 text-center py-5">Nenhum resultado encontrado.</span>
                        )}

                        {results?.map((user) => (
                            <PostAuthor key={user?.id} userId={user?.id} />
                        ))}
                    </div>
                </div>
            )}
        </>
    )
}

export { InputSearch };
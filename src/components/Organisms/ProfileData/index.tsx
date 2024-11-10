import { useUser } from "../../../hooks/Users";
import { InputEdit, ProfileCover } from "../../Molecules";

interface IProps {
    id: number;
    owner: boolean;
}

function ProfileData({ id, owner }: IProps) {
    const { users, setUsers } = useUser();
    const found = users?.find(user => user.id === id);

    const onNameEdit = (value: string, type: 'name' | 'username') => {
        const copy = [...users];
        const index = copy.findIndex((elem) => elem.id === found?.id);

        if (index === -1) return;

        copy[index][type] = value;
        setUsers(copy);
    }

    return (
        <div className="w-full flex flex-col items-center">
            <ProfileCover id={id} owner={owner} />

            <div className="w-full flex flex-col p-5 pt-20 bg-white rounded-b-lg">
                {owner ? (
                    <>
                        <InputEdit
                            value={found?.name ?? ''}
                            onConfirm={(value) => onNameEdit(value, 'name')}
                        />

                        <InputEdit
                            value={found?.username ?? ''}
                            onConfirm={(value) => onNameEdit(value, 'username')}
                        />
                    </>
                ) : (
                    <>
                        <span className="text-neutral-600 text-base font-semibold">
                            {found?.name}
                        </span>

                        <span className="text-neutral-600 text-base font-semibold">
                            @{found?.username}
                        </span>
                    </>
                )}
            </div>
        </div>
    );
}

export { ProfileData };
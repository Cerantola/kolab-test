import { useState, createContext, useContext, useEffect, ReactNode } from "react";
import { IUser } from "../../interfaces/IUser";

interface IUserData {
    users: IUser[];
    setUsers: (users: IUser[]) => void;
}

interface IUserProps {
    children: ReactNode;
}

const UserContext = createContext<IUserData>({} as IUserData);

function UserProvider({ children }: IUserProps) {
    const [users, setUsers] = useState<IUser[]>([]);

    const getUsers = async () => {
        try {
            const res = await fetch("https://jsonplaceholder.typicode.com/users");

            if (!res.ok) {
                return;
            }

            const data = await res.json();

            setUsers(data);
        } catch (error) {}
    };

    useEffect(() => {
        void getUsers();
    }, []);

    return (
        <UserContext.Provider value={{ users, setUsers }}>
            {children}
        </UserContext.Provider>
    );
}

function useUser(): IUserData {
    const context = useContext(UserContext);

    if (!context) {
        throw new Error("useUser deve ser usado com o UserProvider");
    }

    return context;
}

export { UserProvider, useUser };

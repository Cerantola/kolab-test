import { ReactNode } from "react";
import { UserProvider } from "./Users";
import { PublicationModalProvider } from "./PublicationModal";

interface AppProviderProps {
    children: ReactNode;
}

function AppProvider({ children }: AppProviderProps) {
    return (
        <UserProvider>
            <PublicationModalProvider>
                {children}
            </PublicationModalProvider>
        </UserProvider>
    );
}

export default AppProvider;

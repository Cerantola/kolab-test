import { useLocation } from "react-router-dom";
import { userLogged } from "../../../utils/constants";
import { usePublicationModal } from "../../../hooks/PublicationModal";

function BottomTabs() {
    const { pathname } = useLocation();
    const { showPublicationModal } = usePublicationModal();

    return (
        <div className="md:hidden w-full fixed z-50 bottom-0 left-0 shadow-md py-3 px-10 bg-white">
            <ul className="w-full flex items-center justify-between">
                <li>
                    <a href="/">
                        <i className={`material-symbols-outlined mat-icon ${pathname === '/' ? 'text-yellow-500' : 'text-neutral-600'}`}>home</i>
                    </a>
                </li>

                <li>
                    <button
                        onClick={() => showPublicationModal()}
                        className="w-10 h-10 rounded-full flex items-center justify-center bg-yellow-500"
                    >
                        <i className="material-symbols-outlined mat-icon text-white">add</i>
                    </button>
                </li>

                <li>
                    <a href={`/profile/${userLogged.id}`}>
                        <i className={`material-symbols-outlined mat-icon ${pathname?.includes('/profile') ? 'text-yellow-500' : 'text-neutral-600'}`}>person</i>
                    </a>
                </li>
            </ul>
        </div>
    );
}

export { BottomTabs };
import { useLocation } from "react-router-dom";
import { InputSearch } from "../InputSearch";
import { userLogged } from "../../../utils/constants";

import logo from '../../../assets/logo.png';

function NavBar() {
    const { pathname } = useLocation();
    const menus = [
        { id: 1, label: "Home", icon: "home", href: "/" },
        { id: 1, label: "Meu perfil", icon: "person", href: `/profile/${userLogged.id}` },
    ];

    return (
        <header className="w-full flex justify-center fixed z-50 top-0 left-0 shadow-md p-5 bg-white">
            <nav className="w-full max-w-screen-xl flex flex-col md:flex-row items-center justify-between md:gap-20 gap-5">
                <a href="/" aria-label="Logo">
                    <img
                        title="Logo"
                        alt="logo"
                        width={200}
                        height={50}
                        src={logo}
                    />
                </a>

                <InputSearch />

                <ul className="hidden md:flex items-center gap-10">
                    {menus.map(({ label, icon,  href }, index) => (
                        <li key={index}>
                            <a
                                className={`text-neutral-500 hover:text-yellow-500 ${
                                    pathname === href && "text-yellow-500"
                                }`}
                                href={href}
                                aria-label={label}
                                title={label}
                            >
                                <i className="material-symbols-outlined mat-icon">{icon}</i>
                            </a>
                        </li>
                    ))}
                </ul>
            </nav>
        </header>
    );
}

export {NavBar};
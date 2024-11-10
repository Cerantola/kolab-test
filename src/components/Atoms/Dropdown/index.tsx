import React, { useEffect, useRef, useState } from "react";

interface IProps {
    options: {
        label: string;
        onClick: () => void;
    }[];
}

function Dropdown({ options }: IProps) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const handleClick = (onClick: Function) => {
        onClick();
        toggleDropdown();
    }

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="relative inline-block text-left" ref={dropdownRef}>
            <button onClick={toggleDropdown} aria-label="Comentário menu">
                <i className="material-symbols-outlined mat-icon text-neutral-600">more_vert</i>
            </button>

            {isOpen && (
                <div
                    className="absolute right-0 z-10 w-40 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                        {options.map((option) => (
                            <button
                                key={option.label}
                                onClick={() => handleClick(option?.onClick)}
                                className="w-full block px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                                role="menuitem"
                            >
                                {option?.label}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export {Dropdown};
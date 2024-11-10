import { ReactNode, useEffect, useState } from "react";

interface IProps {
    open: boolean;
    children: ReactNode;
}

function Modal({ children, open }: IProps) {
    const [isVisible, setIsVisible] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
        if (open) {
            setIsVisible(true);
            setTimeout(() => setIsAnimating(true), 10);
        } else {
            setIsAnimating(false);
            setTimeout(() => setIsVisible(false), 300);
        }
    }, [open]);

    if (!isVisible) return null;

    return (
        <div
            className="fixed inset-0 z-[99] overflow-hidden flex items-center justify-center"
            aria-labelledby="modal-title"
            role="dialog"
            aria-modal="true"
        >
            <div
                className={`fixed inset-0 bg-black opacity-75 transition-opacity overflow-hidden duration-300 ease-out ${
                    isAnimating ? "opacity-75" : "opacity-0"
                }`}
            />

            <div className="fixed inset-0 z-10 overflow-hidden">
                <div className="flex min-h-full justify-center items-center">
                    <div
                        className={`overflow-hidden lg:overflow-auto flex flex-col relative bg-white transition-all duration-300 ease-out transform lg:max-w-[680px] w-full h-screen lg:!h-[calc(100vh-200px)] rounded-md ${
                            isAnimating ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
                        }`}>
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}

export { Modal };
import { ReactNode } from "react";
import { BottomTabs, NavBar } from "../../Molecules";

interface IProps {
    children: ReactNode;
}

function TemplateDefault({ children }: IProps) {
    return (
        <main className="w-full h-full flex flex-col items-center bg-neutral-100">
            <NavBar />

            <div className="w-full max-w-screen-xl mt-[170px] md:mt-[100px] md:mb-0 mb-20">
                {children}
            </div>

            <BottomTabs />
        </main>
    );
}

export { TemplateDefault };
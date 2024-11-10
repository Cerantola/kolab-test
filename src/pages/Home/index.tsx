import { TemplateDefault } from "../../components/Templates";
import { MakePost } from "../../components/Molecules";
import { Feed } from "../../components/Organisms";

function HomePage() {
    return (
        <TemplateDefault>
            <div className="w-full flex justify-center p-5">
                <div className="w-full max-w-screen-md flex flex-col gap-5">
                    <MakePost />

                    <Feed />
                </div>
            </div>
        </TemplateDefault>
    );
}

export { HomePage };
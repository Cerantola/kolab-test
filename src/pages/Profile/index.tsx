import { useParams } from 'react-router-dom';
import { TemplateDefault } from "../../components/Templates";
import { MakePost } from "../../components/Molecules";
import { Feed, ProfileData } from "../../components/Organisms";
import { userLogged } from "../../utils/constants";

function ProfilePage() {
    const { id } = useParams<{ id: string }>();
    const owner = id ? parseInt(id) === userLogged.id : false;

    return (
        <TemplateDefault>
            <div className="w-full flex justify-center p-5">
                <div className="w-full max-w-screen-md flex flex-col gap-5">
                    <ProfileData id={parseInt(id ?? '')} owner={owner} />

                    {owner && (
                        <MakePost />
                    )}

                    <Feed id={parseInt(id ?? '')} />
                </div>
            </div>
        </TemplateDefault>
    );
}

export { ProfilePage };
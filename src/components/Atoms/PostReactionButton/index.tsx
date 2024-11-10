interface IProps {
    icon: string;
    checked?: boolean;
    onClick: () => void;
}

function PostReactionButton({ icon, checked, onClick }: IProps) {
    return (
        <button onClick={onClick} className={`flex items-center gap-2 appearance-none ${checked ? 'text-yellow-500' : 'text-neutral-600'} text-sm hover:text-yellow-500`}>
            <i className="material-symbols-outlined mat-icon">{icon}</i>
        </button>
    );
}

export { PostReactionButton };
import { useEffect, useState } from "react";

interface IProps {
    value: string;
    onConfirm: (value: string) => void;
}

function InputEdit({ value, onConfirm }: IProps) {
    const [editingEnabled, setEditingEnabled] = useState(false);
    const [newValue, setNewValue] = useState('');

    const handleOnConfirm = () => {
        if (!newValue || newValue === value) {
            setEditingEnabled(false);
            return;
        }

        onConfirm(newValue);
        setEditingEnabled(false);
    }

    useEffect(() => {
        if (!editingEnabled) return;

        setNewValue(value);
    }, [editingEnabled]);

    return (
        <div className="flex items-center gap-5">
            {editingEnabled ? (
                <>
                    <input
                        className="appearance-none outline-none flex-1 md:max-w-[200px] border-b border-b-neutral-200"
                        value={newValue}
                        onChange={(e) => setNewValue(e.target.value)}
                    />

                    <button onClick={handleOnConfirm}>
                        <i className="material-symbols-outlined mat-icon text-green-600">check</i>
                    </button>

                    <button onClick={() => setEditingEnabled(false)}>
                        <i className="material-symbols-outlined mat-icon text-red-600">close</i>
                    </button>
                </>
            ) : (
                <>
                    <span className="text-neutral-600 text-base font-semibold">
                        {value}
                    </span>

                    <button onClick={() => setEditingEnabled(true)}>
                        <i className="material-symbols-outlined mat-icon text-neutral-600">edit</i>
                    </button>
                </>
            )}
        </div>
    );
}

export {InputEdit};
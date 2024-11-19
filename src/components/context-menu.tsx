import React from 'react';
import { useEditorStore } from '../hook/use-editor-store';
import { Trash2, Copy, ArrowUpCircle, ArrowDownCircle } from 'lucide-react';

interface ContextMenuProps {
    x: number;
    y: number;
    onClose: () => void;
}

export const ContextMenu = ({ x, y, onClose }: ContextMenuProps) => {
    const { selectedElement, elements, deleteElement, updateElement } =
        useEditorStore();

    const handleDelete = () => {
        if (selectedElement) {
            deleteElement(selectedElement);
            onClose();
        }
    };

    const handleDuplicate = () => {
        if (selectedElement) {
            const element = elements.find((el: any) => el.id === selectedElement);
            if (element) {
                const newElement = {
                    ...element,
                    id: crypto.randomUUID(),
                    x: element.x + 20,
                    y: element.y + 20,
                };
                updateElement(newElement.id, newElement);
            }
            onClose();
        }
    };

    const handleLayer = (direction: 'up' | 'down') => {
        if (selectedElement) {
            const element = elements.find((el: any) => el.id === selectedElement);
            if (element) {
                updateElement(selectedElement, {
                    zIndex: element.zIndex + (direction === 'up' ? 1 : -1),
                });
            }
            onClose();
        }
    };

    return (
        <div
            className="fixed bg-white rounded-lg shadow-lg py-2 min-w-[160px]"
            style={{ left: x, top: y }}
        >
            <button
                onClick={handleDelete}
                className="w-full px-4 py-2 text-left hover:bg-gray-100 flex items-center gap-2"
            >
                <Trash2 size={16} />
                Delete
            </button>
            {/*  <button
        onClick={handleDuplicate}
        className="w-full px-4 py-2 text-left hover:bg-gray-100 flex items-center gap-2"
      >
        <Copy size={16} />
        Duplicate
      </button> */}
            <button
                onClick={() => handleLayer('up')}
                className="w-full px-4 py-2 text-left hover:bg-gray-100 flex items-center gap-2"
            >
                <ArrowUpCircle size={16} />
                Bring Forward
            </button>
            <button
                onClick={() => handleLayer('down')}
                className="w-full px-4 py-2 text-left hover:bg-gray-100 flex items-center gap-2"
            >
                <ArrowDownCircle size={16} />
                Send Backward
            </button>
        </div>
    );
};

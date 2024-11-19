import { useEffect } from 'react';
import { useEditorStore } from '../hook/use-editor-store';

export const useKeyboardShortcuts = () => {
    const { undo, redo, deleteElement, selectedElement } = useEditorStore();

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.metaKey || e.ctrlKey) {
                switch (e.key) {
                    case 'z':
                        if (e.shiftKey) {
                            e.preventDefault();
                            redo();
                        } else {
                            e.preventDefault();
                            undo();
                        }
                        break;
                    case 'c':
                        // Handle copy
                        break;
                    case 'v':
                        // Handle paste
                        break;
                    case 'a':
                        // Handle select all
                        break;
                }
            } else if (e.key === 'Delete' && selectedElement) {
                deleteElement(selectedElement);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [undo, redo, deleteElement, selectedElement]);
};
import { useState } from 'react';
import { useEditorStore } from '../hook/use-editor-store';
import {
    Type,
    Bold,
    Italic,
    Underline,
    AlignLeft,
    AlignCenter,
    AlignRight,
    Minus,
    Plus,
} from 'lucide-react';

export const TextEditor = () => {
    const [fontSize, setFontSize] = useState(16);
    const [fontFamily, setFontFamily] = useState('Arial');
    const [textAlign, setTextAlign] = useState<'left' | 'center' | 'right'>('left');
    const [isBold, setIsBold] = useState(false);
    const [isItalic, setIsItalic] = useState(false);
    const [isUnderline, setIsUnderline] = useState(false);
    const [color, setColor] = useState('#000000');
    const { addElement } = useEditorStore();

    const handleAddText = () => {
        addElement({
            id: crypto.randomUUID(),
            type: 'text',
            x: 100,
            y: 100,
            rotation: 0,
            data: {
                text: 'Double click to edit',
                fontSize,
                fontFamily,
                textAlign,
                fill: color,
                fontStyle: isItalic ? 'italic' : 'normal',
                fontWeight: isBold ? 'bold' : 'normal',
                textDecoration: isUnderline ? 'underline' : '',
            },
            zIndex: Date.now(),
        });
    };

    return (
        <div className="space-y-4 p-4 w-64">
            <button
                onClick={handleAddText}
                className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
            >
                <Type size={18} />
                Add Text
            </button>

            <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-800">
                    Font Size
                </label>
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => setFontSize(Math.max(8, fontSize - 2))}
                        className="p-1 rounded bg-white hover:bg-zinc-100"
                    >
                        <Minus size={16} />
                    </button>
                    <input
                        type="number"
                        value={fontSize}
                        onChange={(e) => setFontSize(Number(e.target.value))}
                        className="w-full px-3 py-2 bg-zinc-100 hover:bg-zinc-100 rounded-lg"
                        min="8"
                        max="72"
                    />
                    <button
                        onClick={() => setFontSize(Math.min(72, fontSize + 2))}
                        className="p-1 rounded bg-white hover:bg-zinc-100"
                    >
                        <Plus size={16} />
                    </button>
                </div>
            </div>

            <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-800">
                    Font Family
                </label>
                <select
                    value={fontFamily}
                    onChange={(e) => setFontFamily(e.target.value)}
                    className="w-full px-3 py-2 bg-zinc-100 rounded-lg"
                >
                    <option value="Arial">Arial</option>
                    <option value="Times New Roman">Times New Roman</option>
                    <option value="Courier New">Courier New</option>
                    <option value="Georgia">Georgia</option>
                    <option value="Verdana">Verdana</option>
                </select>
            </div>

            <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-800">
                    Text Color
                </label>
                <input
                    type="color"
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                    className="w-full h-8 rounded cursor-pointer"
                />
            </div>

            <div className="flex gap-4">
                <button
                    onClick={() => setIsBold(!isBold)}
                    className={`p-2 rounded ${isBold ? 'bg-blue-600' : 'bg-gray-100'}`}
                    title="Bold"
                >
                    <Bold size={20} />
                </button>
                <button
                    onClick={() => setIsItalic(!isItalic)}
                    className={`p-2 rounded ${isItalic ? 'bg-blue-600' : 'bg-gray-100'}`}
                    title="Italic"
                >
                    <Italic size={20} />
                </button>
                <button
                    onClick={() => setIsUnderline(!isUnderline)}
                    className={`p-2 rounded ${isUnderline ? 'bg-blue-600' : 'bg-gray-100'}`}
                    title="Underline"
                >
                    <Underline size={20} />
                </button>
            </div>

            <div className="flex gap-4">
                <button
                    onClick={() => setTextAlign('left')}
                    className={`p-2 rounded ${textAlign === 'left' ? 'bg-blue-600' : 'bg-gray-100'}`}
                    title="Align Left"
                >
                    <AlignLeft size={20} />
                </button>
                <button
                    onClick={() => setTextAlign('center')}
                    className={`p-2 rounded ${textAlign === 'center' ? 'bg-blue-600' : 'bg-gray-100'}`}
                    title="Align Center"
                >
                    <AlignCenter size={20} />
                </button>
                <button
                    onClick={() => setTextAlign('right')}
                    className={`p-2 rounded ${textAlign === 'right' ? 'bg-blue-600' : 'bg-gray-100'}`}
                    title="Align Right"
                >
                    <AlignRight size={20} />
                </button>
            </div>
        </div>
    );
};
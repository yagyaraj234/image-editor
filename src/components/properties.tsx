import { useEditorStore } from '../hook/use-editor-store';
import { Download } from 'lucide-react';

export const Properties = () => {
    const { selectedElement, elements, updateElement } = useEditorStore();

    const selectedItem = elements.find((el: any) => el.id === selectedElement);

    const handleExport = () => {
        // Implement export functionality
    };

    const getNumberValue = (value: number | undefined) => {
        return typeof value === 'number' ? Math.round(value) : 0;
    };

    return (
        <div className="w-[300px] bg-white border-l border-gray-200 p-4">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-semibold text-gray-800">Properties</h2>
                <button
                    onClick={handleExport}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                    <Download size={18} />
                    Export
                </button>
            </div>

            {selectedItem ? (
                <div className="space-y-4">
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">
                            Position
                        </label>
                        <div className="grid grid-cols-2 gap-2">
                            <div className="space-y-1">
                                <span className="text-xs text-gray-500">X</span>
                                <input
                                    type="number"
                                    value={getNumberValue(selectedItem.x)}
                                    onChange={(e) =>
                                        updateElement(selectedItem.id, { x: Number(e.target.value) })
                                    }
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>
                            <div className="space-y-1">
                                <span className="text-xs text-gray-500">Y</span>
                                <input
                                    type="number"
                                    value={getNumberValue(selectedItem.y)}
                                    onChange={(e) =>
                                        updateElement(selectedItem.id, { y: Number(e.target.value) })
                                    }
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">
                            Size
                        </label>
                        <div className="grid grid-cols-2 gap-2">
                            <div className="space-y-1">
                                <span className="text-xs text-gray-500">Width</span>
                                <input
                                    type="number"
                                    value={getNumberValue(selectedItem.width)}
                                    onChange={(e) =>
                                        updateElement(selectedItem.id, { width: Number(e.target.value) })
                                    }
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>
                            <div className="space-y-1">
                                <span className="text-xs text-gray-500">Height</span>
                                <input
                                    type="number"
                                    value={getNumberValue(selectedItem.height)}
                                    onChange={(e) =>
                                        updateElement(selectedItem.id, { height: Number(e.target.value) })
                                    }
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">
                            Rotation
                        </label>
                        <input
                            type="number"
                            value={getNumberValue(selectedItem.rotation)}
                            onChange={(e) =>
                                updateElement(selectedItem.id, {
                                    rotation: Number(e.target.value),
                                })
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                </div>
            ) : (
                <p className="text-gray-500">Select an element to edit its properties</p>
            )}
        </div>
    );
};
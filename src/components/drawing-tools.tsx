import { useEditorStore } from '../hook/use-editor-store';

export const DrawingTools = () => {
  const { selectedTool, brushSize, brushColor, setBrushSize, setBrushColor } = useEditorStore();

  return (
    <div className="space-y-4 p-4">
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-800">
          Brush Size
        </label>
        <input
          type="range"
          min="1"
          max="20"
          value={brushSize}
          onChange={(e) => setBrushSize(Number(e.target.value))}
          className="w-full"
        />
        <div className="text-sm text-gray-600">{brushSize}px</div>
      </div>

      {selectedTool === 'draw' && (
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-800">
            Color
          </label>
          <input
            type="color"
            value={brushColor}
            onChange={(e) => setBrushColor(e.target.value)}
            className="w-full h-8 rounded cursor-pointer"
          />
        </div>
      )}

      <div className="flex items-center gap-4 p-2 bg-white rounded-lg border border-gray-200">
        <div
          className="w-8 h-8 rounded-full border-2 border-gray-300"
          style={{ backgroundColor: brushColor }}
        />
        <div className="flex-1">
          <div className="text-sm font-medium text-gray-800">
            {selectedTool === 'draw' ? 'Drawing' : 'Eraser'} Tool
          </div>
          <div className="text-xs text-gray-600">
            Click and drag to {selectedTool === 'draw' ? 'draw' : 'erase'}
          </div>
        </div>
      </div>
    </div>
  );
};
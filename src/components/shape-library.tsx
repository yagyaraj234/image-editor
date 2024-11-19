import { useEditorStore } from '../hook/use-editor-store';
import { ShapeType } from '../types/editor';
import {
  Square,
  Circle,
  Star,
  ArrowRight,
  Minus,
  Triangle,
} from 'lucide-react';

const shapes: { type: ShapeType; icon: any; label: string }[] = [
  { type: 'rectangle', icon: Square, label: 'Rectangle' },
  { type: 'circle', icon: Circle, label: 'Circle' },
  { type: 'star', icon: Star, label: 'Star' },
  { type: 'arrow', icon: ArrowRight, label: 'Arrow' },
  { type: 'line', icon: Minus, label: 'Line' },
  { type: 'polygon', icon: Triangle, label: 'Polygon' },
];

export const ShapeLibrary = () => {
  const { addElement } = useEditorStore();

  const handleAddShape = (type: ShapeType) => {
    addElement({
      id: crypto.randomUUID(),
      type: 'shape',
      x: 100,
      y: 100,
      width: 100,
      height: 100,
      rotation: 0,
      data: { shapeType: type },
      zIndex: Date.now(),
    });
  };

  return (
    <div className="grid grid-cols-2 gap-2 p-2 w-40">
      {shapes.map(({ type, icon: Icon, label }) => (
        <button
          key={type}
          onClick={() => handleAddShape(type)}
          className="p-3 rounded-lg flex flex-col items-center gap-1 bg-white hove:bg-zinc-100 transition-colors"
        >
          <Icon size={20} />
          <span className="text-xs">{label}</span>
        </button>
      ))}
    </div>
  );
};
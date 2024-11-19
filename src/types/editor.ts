export type Tool = 
  | 'select'
  | 'images'
  | 'shapes'
  | 'text'
  | 'draw'
  | 'eraser' | '';

export type ShapeType = 
  | 'rectangle'
  | 'circle'
  | 'ellipse'
  | 'star'
  | 'arrow'
  | 'line'
  | 'polygon';

export interface EditorElement {
  id: string;
  type: 'image' | 'shape' | 'text' | 'drawing';
  x: number;
  y: number;
  width?: number;
  height?: number;
  rotation: number;
  data: any;
  zIndex: number;
}
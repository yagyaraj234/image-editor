import { create } from 'zustand';
import { Tool, EditorElement } from '../types/editor';

interface EditorStore {
  selectedTool: Tool;
  elements: EditorElement[];
  selectedElement: string | null;
  history: EditorElement[][];
  historyIndex: number;
  brushSize: number;
  brushColor: string;
  setSelectedTool: (tool: Tool) => void;
  setBrushSize: (size: number) => void;
  setBrushColor: (color: string) => void;
  addElement: (element: EditorElement) => void;
  updateElement: (id: string, updates: Partial<EditorElement>) => void;
  deleteElement: (id: string) => void;
  selectElement: (id: string | null) => void;
  undo: () => void;
  redo: () => void;
}

export const useEditorStore = create<EditorStore>((set) => ({
  selectedTool: 'select',
  elements: [],
  selectedElement: null,
  history: [[]],
  historyIndex: 0,
  brushSize: 2,
  brushColor: '#000000',

  setSelectedTool: (tool) => set({ selectedTool: tool }),
  setBrushSize: (size) => set({ brushSize: size }),
  setBrushColor: (color) => set({ brushColor: color }),

  addElement: (element) => set((state) => {
    const newElements = [...state.elements, element];
    const newHistory = state.history.slice(0, state.historyIndex + 1);
    return {
      elements: newElements,
      history: [...newHistory, newElements],
      historyIndex: state.historyIndex + 1,
    };
  }),

  updateElement: (id, updates) => set((state) => {
    const newElements = state.elements.map((el) =>
      el.id === id ? { ...el, ...updates } : el
    );
    const newHistory = state.history.slice(0, state.historyIndex + 1);
    return {
      elements: newElements,
      history: [...newHistory, newElements],
      historyIndex: state.historyIndex + 1,
    };
  }),

  deleteElement: (id) => set((state) => {
    const newElements = state.elements.filter((el) => el.id !== id);
    const newHistory = state.history.slice(0, state.historyIndex + 1);
    return {
      elements: newElements,
      selectedElement: null,
      history: [...newHistory, newElements],
      historyIndex: state.historyIndex + 1,
    };
  }),

  selectElement: (id) => set({ selectedElement: id }),

  undo: () => set((state) => {
    if (state.historyIndex > 0) {
      return {
        elements: state.history[state.historyIndex - 1],
        historyIndex: state.historyIndex - 1,
      };
    }
    return state;
  }),

  redo: () => set((state) => {
    if (state.historyIndex < state.history.length - 1) {
      return {
        elements: state.history[state.historyIndex + 1],
        historyIndex: state.historyIndex + 1,
      };
    }
    return state;
  }),
}));
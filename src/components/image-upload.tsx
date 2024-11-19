import React, { useCallback } from 'react';
import { useEditorStore } from '../hook/use-editor-store';
import { Upload } from 'lucide-react';

export const ImageUpload = () => {
  const { addElement } = useEditorStore();

  const handleUpload = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      const img = new window.Image();
      img.src = dataUrl;
      img.onload = () => {
        const aspectRatio = img.width / img.height;
        const maxWidth = 500;
        const width = Math.min(img.width, maxWidth);
        const height = width / aspectRatio;

        addElement({
          id: crypto.randomUUID(),
          type: 'image',
          x: 50,
          y: 50,
          width,
          height,
          rotation: 0,
          data: { src: dataUrl },
          zIndex: Date.now(),
        });
      };
    };
    reader.readAsDataURL(file);
  }, [addElement]);

  return (
    <div className="relative w-64 p-4 z-[3200]">
      <input
        type="file"
        accept="image/*"
        onChange={handleUpload}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
      />
      <div className="p-4 border-2 border-dashed border-gray-300 rounded-lg">
        <div className="flex flex-col items-center gap-2">
          <Upload size={24} />
          <span className="text-sm">Upload Image</span>
        </div>
      </div>
    </div>
  );
};
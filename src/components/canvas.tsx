// @ts-nocheck
import React, { useRef, useState, useEffect } from 'react';
import { Stage, Layer, Image, Text, Line, Rect, Circle, Arrow, Star, Transformer } from 'react-konva';
import { useEditorStore } from '../hook/use-editor-store';
import { ContextMenu } from './context-menu';
import { useKeyboardShortcuts } from '../hook/use-keyboard-shortcuts';
import useImage from 'use-image';

const ImageElement = ({ src, ...props }: any) => {
    const [image] = useImage(src) as [HTMLImageElement | undefined, string];
    return <Image image={image} {...props} />;
};

export const Canvas = () => {
    const stageRef = useRef(null);
    const transformerRef = useRef(null);
    const [contextMenu, setContextMenu] = useState<{ x: number; y: number } | null>(null);
    const { elements, selectedElement, selectElement, updateElement, selectedTool, addElement, brushSize, brushColor } = useEditorStore();

    // Drawing state
    const [isDrawing, setIsDrawing] = useState(false);
    const [currentPoints, setCurrentPoints] = useState<number[]>([]);
    const drawingLayerRef = useRef(null);

    useKeyboardShortcuts();

    useEffect(() => {
        if (transformerRef.current && stageRef.current) {
            const transformer = transformerRef.current;
            const stage = stageRef.current.getStage();
            const selectedNode = stage.findOne(`#${selectedElement}`);

            if (selectedNode) {
                transformer.nodes([selectedNode]);
            } else {
                transformer.nodes([]);
            }
            transformer.getLayer()?.batchDraw();
        }
    }, [selectedElement]);

    const handleMouseDown = (e: any) => {
        if (selectedTool !== 'draw' && selectedTool !== 'eraser') return;

        setIsDrawing(true);
        const stage = e.target.getStage();
        const point = stage.getPointerPosition();
        setCurrentPoints([point.x, point.y]);
    };

    const handleMouseMove = (e: any) => {
        if (!isDrawing) return;

        const stage = e.target.getStage();
        const point = stage.getPointerPosition();
        setCurrentPoints([...currentPoints, point.x, point.y]);
    };

    const handleMouseUp = () => {
        if (!isDrawing) return;

        setIsDrawing(false);
        if (currentPoints.length >= 4) {
            addElement({
                id: crypto.randomUUID(),
                type: 'drawing',
                x: 0,
                y: 0,
                rotation: 0,
                data: {
                    points: currentPoints,
                    brushSize,
                    color: selectedTool === 'eraser' ? '#ffffff' : brushColor,
                    tool: selectedTool,
                },
                zIndex: Date.now(),
            });
        }
        setCurrentPoints([]);
    };

    const handleSelect = (e: any) => {
        if (selectedTool === 'draw' || selectedTool === 'eraser') return;

        const clickedOnEmpty = e.target === e.target.getStage();
        if (clickedOnEmpty) {
            selectElement(null);
            setContextMenu(null);
        }
    };

    const handleContextMenu = (e: any) => {
        e.evt.preventDefault();
        setContextMenu({
            x: e.evt.clientX,
            y: e.evt.clientY,
        });
    };

    const handleTextDblClick = (e: any, element: any) => {
        const textNode = e.target;
        const stage = stageRef.current?.getStage();
        if (!stage) return;

        const textPosition = textNode.getAbsolutePosition();
        const stageBox = stage.container().getBoundingClientRect();

        const input = document.createElement('input');
        input.value = element.data.text;
        input.style.position = 'absolute';
        input.style.left = `${stageBox.left + textPosition.x}px`;
        input.style.top = `${stageBox.top + textPosition.y}px`;
        input.style.width = `${textNode.width()}px`;
        input.style.height = `${textNode.height()}px`;
        input.style.fontSize = `${element.data.fontSize}px`;
        input.style.fontFamily = element.data.fontFamily;
        input.style.color = element.data.fill;
        input.style.padding = '4px';
        input.style.border = '2px solid #2563eb';
        input.style.borderRadius = '4px';
        input.style.background = 'white';
        input.style.outline = 'none';
        input.style.zIndex = '1000';
        input.style.minWidth = '100px';

        document.body.appendChild(input);
        input.focus();
        input.select();

        const handleBlur = () => {
            const newText = input.value;
            document.body.removeChild(input);
            if (newText !== element.data.text) {
                updateElement(element.id, {
                    data: { ...element.data, text: newText },
                });
            }
        };

        input.addEventListener('blur', handleBlur);
        input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                input.blur();
            }
            if (e.key === 'Escape') {
                input.value = element.data.text;
                input.blur();
            }
        });
    };

    const renderElement = (element: any) => {
        const commonProps = {
            id: element.id,
            onClick: () => selectElement(element.id),
            onContextMenu: handleContextMenu,
            draggable: true,
            onDragEnd: (e: any) => {
                updateElement(element.id, {
                    x: e.target.x(),
                    y: e.target.y(),
                });
            },
            onTransformEnd: (e: any) => {
                const node = e.target;
                updateElement(element.id, {
                    x: node.x(),
                    y: node.y(),
                    width: node.width() * node.scaleX(),
                    height: node.height() * node.scaleY(),
                    rotation: node.rotation(),
                });
            },
        };

        switch (element.type) {
            case 'image':
                return (
                    <ImageElement
                        key={element.id}
                        src={element.data.src}
                        x={element.x}
                        y={element.y}
                        width={element.width}
                        height={element.height}
                        rotation={element.rotation}
                        {...commonProps}
                    />
                );
            case 'text':
                return (
                    <Text
                        key={element.id}
                        x={element.x}
                        y={element.y}
                        text={element.data.text}
                        fontSize={element.data.fontSize}
                        fontFamily={element.data.fontFamily}
                        fill={element.data.fill}
                        align={element.data.textAlign}
                        fontStyle={element.data.fontStyle}
                        textDecoration={element.data.textDecoration}
                        rotation={element.rotation}
                        onDblClick={(e) => handleTextDblClick(e, element)}
                        {...commonProps}
                    />
                );
            case 'shape':
                switch (element.data.shapeType) {
                    case 'rectangle':
                        return (
                            <Rect
                                key={element.id}
                                x={element.x}
                                y={element.y}
                                width={element.width}
                                height={element.height}
                                fill={element.data.fill || '#ffffff'}
                                stroke={element.data.stroke || '#000000'}
                                strokeWidth={element.data.strokeWidth || 2}
                                rotation={element.rotation}
                                {...commonProps}
                            />
                        );
                    case 'circle':
                        return (
                            <Circle
                                key={element.id}
                                x={element.x}
                                y={element.y}
                                radius={element.width / 2}
                                fill={element.data.fill || '#ffffff'}
                                stroke={element.data.stroke || '#000000'}
                                strokeWidth={element.data.strokeWidth || 2}
                                rotation={element.rotation}
                                {...commonProps}
                            />
                        );
                    case 'star':
                        return (
                            <Star
                                key={element.id}
                                x={element.x}
                                y={element.y}
                                numPoints={5}
                                innerRadius={element.width / 4}
                                outerRadius={element.width / 2}
                                fill={element.data.fill || '#ffffff'}
                                stroke={element.data.stroke || '#000000'}
                                strokeWidth={element.data.strokeWidth || 2}
                                rotation={element.rotation}
                                {...commonProps}
                            />
                        );
                    case 'arrow':
                        return (
                            <Arrow
                                key={element.id}
                                x={element.x}
                                y={element.y}
                                points={[0, 0, element.width, element.height]}
                                fill={element.data.fill || '#ffffff'}
                                stroke={element.data.stroke || '#000000'}
                                strokeWidth={element.data.strokeWidth || 2}
                                rotation={element.rotation}
                                {...commonProps}
                            />
                        );
                    default:
                        return null;
                }
            case 'drawing':
                return (
                    <Line
                        key={element.id}
                        points={element.data.points}
                        stroke={element.data.color}
                        strokeWidth={element.data.brushSize}
                        tension={0.5}
                        lineCap="round"
                        lineJoin="round"
                        globalCompositeOperation={
                            element.data.tool === 'eraser' ? 'destination-out' : 'source-over'
                        }
                        {...commonProps}
                    />
                );
            default:
                return null;
        }
    };

    return (
        <div className="flex-1 bg-gray-100 overflow-hidden relative">
            <Stage
                ref={stageRef}
                width={window.innerWidth - 420}
                height={window.innerHeight}
                onClick={handleSelect}
                onContextMenu={handleContextMenu}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                className="bg-white shadow-lg"
            >
                <Layer>
                    {elements
                        .sort((a, b) => a.zIndex - b.zIndex)
                        .map(renderElement)}
                    {isDrawing && (
                        <Line
                            points={currentPoints}
                            stroke={selectedTool === 'eraser' ? '#ffffff' : brushColor}
                            strokeWidth={brushSize}
                            tension={0.5}
                            lineCap="round"
                            lineJoin="round"
                            globalCompositeOperation={
                                selectedTool === 'eraser' ? 'destination-out' : 'source-over'
                            }
                        />
                    )}
                    <Transformer
                        ref={transformerRef}
                        boundBoxFunc={(oldBox, newBox) => {
                            const minWidth = 5;
                            const minHeight = 5;
                            const maxWidth = 800;
                            const maxHeight = 800;

                            if (
                                newBox.width < minWidth ||
                                newBox.height < minHeight ||
                                newBox.width > maxWidth ||
                                newBox.height > maxHeight
                            ) {
                                return oldBox;
                            }
                            return newBox;
                        }}
                    />
                </Layer>
            </Stage>
            {contextMenu && (
                <ContextMenu
                    x={contextMenu.x}
                    y={contextMenu.y}
                    onClose={() => setContextMenu(null)}
                />
            )}
        </div>
    );
};
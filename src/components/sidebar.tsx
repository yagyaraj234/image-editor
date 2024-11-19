import { CompassIcon, Eraser, ImageIcon, PaintBucket, Shapes, TextIcon } from "lucide-react"
import { useEditorStore } from "../hook/use-editor-store";
import { useState } from "react";
import { ImageUpload } from "./image-upload";
import { DrawingTools } from "./drawing-tools";
import { ShapeLibrary } from "./shape-library";
import { TextEditor } from "./text-editor";

const sidebar: Record<string, any>[] = [{
    name: 'text',
    icon: <TextIcon />,
    id: 1,
}, {
    name: 'brand',
    icon: <CompassIcon />,
    id: 2
}, {
    name: 'images',
    icon: <ImageIcon />,
    id: 3
},
{
    name: 'shapes',
    icon: <Shapes />,
    id: 4
},
{
    name: 'draw',
    icon: <PaintBucket />,
    id: 5
},
{
    name: 'eraser',
    icon: <Eraser />,
    id: 6
}
]

interface Props {
    isExpanded: boolean,
    onToolSelect: () => void;
    toggleSidebar: () => void;
}

export default function Sidebar({ isExpanded, onToolSelect, toggleSidebar }: Props) {
    const { selectedTool = "images", setSelectedTool } = useEditorStore();
    const [expandedTool, setExpandedTool] = useState<string | null>(null);

    const handleToolClick = (id: string) => {
        setSelectedTool(id as any);
        if (isExpanded) {
            if (expandedTool === id) {
                onToolSelect();
            } else {
                setExpandedTool(id);
            }
        } else {
            setExpandedTool(id);
            toggleSidebar();
        }
    };

    const renderExpandedContent = () => {
        if (!isExpanded) return null;

        switch (expandedTool) {
            case 'images':
                return <ImageUpload />;
            // case 'shapes':
            //     return <ShapeLibrary />;
            case 'text':
                return <TextEditor />;
            // case 'draw':
            //     return <DrawingTools />
            // case 'eraser':
            //     return <DrawingTools />;
            default:
                return null;
        }
    };

    return (
        <div className="flex gap-2 sticky left-0 ">
            <div className="bg-white rounded-[4px] flex flex-col gap-4 relative shadow-xl px-4 max-h-[60vh] py-[8px]">
                {sidebar.map((item) => (
                    <div className="flex flex-col gap-1 items-center justify-center cursor-pointer"
                        onClick={() => {
                            handleToolClick(item.name)
                        }}
                    >
                        <div className="size-6">
                            {item.icon}
                        </div>
                        <div className="text-sm font-semibold text-center">
                            {item.name}
                        </div>
                    </div>
                ))}


            </div>
            {/* <DrawingTools /> */}
            {isExpanded && expandedTool && (
                <div className="absolute left-[88px] !bg-white rounded shadow-xl min-w-40 !z-[3200]">
                    {renderExpandedContent()}
                </div>
            )}

        </div>
    )
}
import { Tilemap } from "@/components/editor/tilemap";
import { EditorToolbar } from "./editor-toolbar";
import { useProjectStore } from "@/stores/project-store";
import React from "react";
import { cn } from "@/lib/utils";

export function Editor() {
  const offset = useProjectStore((state) => state.offset);
  const setOffset = useProjectStore((state) => state.setOffset);
  const zoom = useProjectStore((state) => state.zoom);
  const setZoom = useProjectStore((state) => state.setZoom);

  const [isDragging, setIsDragging] = React.useState(false);
  const dragStartRef = React.useRef({
    mouseX: 0,
    mouseY: 0,
    offsetX: 0,
    offsetY: 0,
  });

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    // Use middle mouse button to drag
    if (event.button !== 1) return;
    setIsDragging(true);
    dragStartRef.current = {
      mouseX: event.clientX,
      mouseY: event.clientY,
      offsetX: offset.x,
      offsetY: offset.y,
    };
    event.currentTarget.setPointerCapture(event.pointerId);
  };
  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    const dx = event.clientX - dragStartRef.current.mouseX;
    const dy = event.clientY - dragStartRef.current.mouseY;
    setOffset({
      x: dragStartRef.current.offsetX + dx,
      y: dragStartRef.current.offsetY + dy,
    });
  };
  const handlePointerUp = (_event: React.PointerEvent<HTMLDivElement>) => {
    setIsDragging(false);
  };
  const handleWheel = (event: React.WheelEvent<HTMLDivElement>) => {
    const newZoom = Math.max(0.1, zoom - event.deltaY / 1000);
    if (newZoom === zoom) return;

    // Mouse position relative to the container center
    const rect = event.currentTarget.getBoundingClientRect();
    const mouseX = event.clientX - rect.left - rect.width / 2;
    const mouseY = event.clientY - rect.top - rect.height / 2;

    // Adjust offset so the world point under the cursor stays fixed
    const scale = newZoom / zoom;
    setOffset({
      x: mouseX - scale * (mouseX - offset.x),
      y: mouseY - scale * (mouseY - offset.y),
    });
    setZoom(newZoom);
  };

  return (
    <div className="relative flex-1">
      <div
        className={cn(
          "absolute top-0 left-0 right-0 bottom-0",
          isDragging && "cursor-grabbing",
        )}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onWheel={handleWheel}
      >
        <Tilemap />
      </div>
      <div className="absolute bottom-0 left-0 right-0 flex justify-center items-center p-4 z-10">
        <EditorToolbar />
      </div>
    </div>
  );
}

export default Editor;

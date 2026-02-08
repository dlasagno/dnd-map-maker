import { Tilemap, BASE_TILE_SIZE } from "@/components/editor/tilemap";
import { EditorToolbar } from "./editor-toolbar";
import { useProjectStore } from "@/stores/project-store";
import React from "react";
import { cn } from "@/lib/utils";

const ARROW_PAN_STEP = 50;
const ARROW_PAN_STEP_FAST = 100;
const ZOOM_STEP = 0.1;
const FIT_PADDING = 40;

export function Editor() {
  const offset = useProjectStore((state) => state.offset);

  const [isPanning, setIsPanning] = React.useState(false);
  const [isSpaceHeld, setIsSpaceHeld] = React.useState(false);
  const [isHandTool, setIsHandTool] = React.useState(false);

  const dragStartRef = React.useRef({
    mouseX: 0,
    mouseY: 0,
    offsetX: 0,
    offsetY: 0,
  });
  const containerRef = React.useRef<HTMLDivElement>(null);

  const canPan = isSpaceHeld || isHandTool;

  // ---------------------------------------------------------------------------
  // Keyboard shortcuts
  // ---------------------------------------------------------------------------
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't intercept when typing in an input
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      )
        return;

      const state = useProjectStore.getState();
      const isMod = e.metaKey || e.ctrlKey;

      // Spacebar — hold to pan
      if (e.code === "Space" && !e.repeat) {
        e.preventDefault();
        setIsSpaceHeld(true);
        return;
      }

      // H — toggle hand tool
      if (e.code === "KeyH" && !e.repeat && !isMod) {
        setIsHandTool((prev) => !prev);
        return;
      }

      // Arrow keys — pan (Shift = faster)
      const panStep = e.shiftKey ? ARROW_PAN_STEP_FAST : ARROW_PAN_STEP;
      switch (e.code) {
        case "ArrowLeft":
          e.preventDefault();
          state.setOffset({ x: state.offset.x + panStep, y: state.offset.y });
          return;
        case "ArrowRight":
          e.preventDefault();
          state.setOffset({ x: state.offset.x - panStep, y: state.offset.y });
          return;
        case "ArrowUp":
          e.preventDefault();
          state.setOffset({ x: state.offset.x, y: state.offset.y + panStep });
          return;
        case "ArrowDown":
          e.preventDefault();
          state.setOffset({ x: state.offset.x, y: state.offset.y - panStep });
          return;
      }

      // Ctrl/Cmd + = / + — zoom in
      if (isMod && (e.code === "Equal" || e.code === "NumpadAdd")) {
        e.preventDefault();
        state.setZoom(state.zoom + ZOOM_STEP);
        return;
      }

      // Ctrl/Cmd + - — zoom out
      if (isMod && (e.code === "Minus" || e.code === "NumpadSubtract")) {
        e.preventDefault();
        state.setZoom(state.zoom - ZOOM_STEP);
        return;
      }

      // Ctrl/Cmd + 0 — reset zoom to 100 %
      if (isMod && e.code === "Digit0") {
        e.preventDefault();
        state.setZoom(1);
        return;
      }

      // Shift + 1 — zoom to fit
      if (e.shiftKey && e.code === "Digit1") {
        e.preventDefault();
        const el = containerRef.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const tilemap = state.tilemap;
        const contentWidth = (tilemap[0]?.length ?? 10) * BASE_TILE_SIZE;
        const contentHeight = tilemap.length * BASE_TILE_SIZE;
        const fitZoom = Math.min(
          (rect.width - FIT_PADDING * 2) / contentWidth,
          (rect.height - FIT_PADDING * 2) / contentHeight,
        );
        state.setOffset({ x: 0, y: 0 });
        state.setZoom(fitZoom);
        return;
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.code === "Space") {
        setIsSpaceHeld(false);
      }
    };

    // Reset space-held state when the window loses focus (e.g. alt-tab)
    const handleBlur = () => {
      setIsSpaceHeld(false);
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    window.addEventListener("blur", handleBlur);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
      window.removeEventListener("blur", handleBlur);
    };
  }, []);

  // ---------------------------------------------------------------------------
  // Wheel / trackpad — must be non-passive so we can preventDefault
  // ---------------------------------------------------------------------------
  React.useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      const state = useProjectStore.getState();

      if (e.ctrlKey || e.metaKey) {
        // Ctrl + scroll  or  trackpad pinch → zoom toward cursor
        const zoomFactor = 1 - e.deltaY / 300;
        const newZoom = state.zoom * zoomFactor;
        // Let the store clamp
        const clampedZoom = Math.min(256, Math.max(0.02, newZoom));
        if (clampedZoom === state.zoom) return;

        const rect = el.getBoundingClientRect();
        const mouseX = e.clientX - rect.left - rect.width / 2;
        const mouseY = e.clientY - rect.top - rect.height / 2;

        const scale = clampedZoom / state.zoom;
        state.setOffset({
          x: mouseX - scale * (mouseX - state.offset.x),
          y: mouseY - scale * (mouseY - state.offset.y),
        });
        state.setZoom(clampedZoom);
      } else {
        // Regular scroll / two-finger trackpad → pan
        state.setOffset({
          x: state.offset.x - e.deltaX,
          y: state.offset.y - e.deltaY,
        });
      }
    };

    el.addEventListener("wheel", handleWheel, { passive: false });
    return () => el.removeEventListener("wheel", handleWheel);
  }, []);

  // ---------------------------------------------------------------------------
  // Pointer events — drag to pan
  // ---------------------------------------------------------------------------
  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    // Middle mouse button (1) always pans
    // Left button (0) pans when space is held or hand tool is active
    const isMiddleClick = event.button === 1;
    const isLeftClickPan = event.button === 0 && canPan;

    if (!isMiddleClick && !isLeftClickPan) return;

    setIsPanning(true);
    dragStartRef.current = {
      mouseX: event.clientX,
      mouseY: event.clientY,
      offsetX: offset.x,
      offsetY: offset.y,
    };
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!isPanning) return;
    const dx = event.clientX - dragStartRef.current.mouseX;
    const dy = event.clientY - dragStartRef.current.mouseY;
    useProjectStore.getState().setOffset({
      x: dragStartRef.current.offsetX + dx,
      y: dragStartRef.current.offsetY + dy,
    });
  };

  const handlePointerUp = () => {
    setIsPanning(false);
  };

  // ---------------------------------------------------------------------------
  // Cursor
  // ---------------------------------------------------------------------------
  const cursorClass = isPanning
    ? "cursor-grabbing"
    : canPan
      ? "cursor-grab"
      : "";

  return (
    <div className="relative flex-1">
      <div
        ref={containerRef}
        className={cn(
          "absolute top-0 left-0 right-0 bottom-0",
          cursorClass,
        )}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
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

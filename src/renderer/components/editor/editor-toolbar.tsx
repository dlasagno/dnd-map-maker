import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { useProjectStore } from "@/stores/project-store";
import {
  IconCurrentLocation,
  IconDice6,
  IconZoomIn,
  IconZoomOut,
} from "@tabler/icons-react";

interface EditorToolbarProps {
  className?: string;
}

export function EditorToolbar({ className }: EditorToolbarProps) {
  const randomizeTilemap = useProjectStore((state) => state.randomizeTilemap);
  const setOffset = useProjectStore((state) => state.setOffset);
  const zoom = useProjectStore((state) => state.zoom);
  const setZoom = useProjectStore((state) => state.setZoom);

  return (
    <div
      className={cn(
        "flex items-center gap-0.5 ring-foreground/10 bg-card text-card-foreground rounded-lg p-2 text-xs/relaxed ring-1",
        className,
      )}
    >
      <Button
        variant="secondary"
        size="icon"
        onClick={() => randomizeTilemap()}
      >
        <IconDice6 />
      </Button>
      <Separator orientation="vertical" className="mx-2" />
      <Button
        variant="secondary"
        size="icon"
        onClick={() => {
          setOffset({ x: 0, y: 0 });
          setZoom(1);
        }}
      >
        <IconCurrentLocation />
      </Button>
      <label className="text-sm/relaxed mx-1">{(zoom * 100).toFixed(0)}%</label>
      <Button
        variant="secondary"
        size="icon"
        onClick={() => setZoom(zoom - 0.1)}
      >
        <IconZoomOut />
      </Button>
      <Button
        variant="secondary"
        size="icon"
        onClick={() => setZoom(zoom + 0.1)}
      >
        <IconZoomIn />
      </Button>
    </div>
  );
}

export default EditorToolbar;

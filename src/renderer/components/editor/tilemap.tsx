import { cn } from "@/lib/utils";
import { useProjectStore } from "@/stores/project-store";
import { Application, extend, useApplication } from "@pixi/react";
import { Container, Graphics, Rectangle } from "pixi.js";
import React from "react";

extend({
  Container,
  Graphics,
  Rectangle,
});

const BASE_TILE_SIZE = 30;
const GRID_SIZE = 10;

interface TilemapProps {
  className?: string;
}

function Tilemap({ className }: TilemapProps) {
  const canvasRef = React.useRef<HTMLDivElement>(null);

  return (
    <div ref={canvasRef} className={cn("w-full h-full", className)}>
      <Application resizeTo={canvasRef}>
        <Tiles />
      </Application>
    </div>
  );
}

function Tiles() {
  const { app } = useApplication();
  const tilemap = useProjectStore((state) => state.tilemap);
  const offset = useProjectStore((state) => state.offset);
  const zoom = useProjectStore((state) => state.zoom);

  const width = BASE_TILE_SIZE * GRID_SIZE;
  const height = BASE_TILE_SIZE * GRID_SIZE;

  return (
    <pixiContainer
      x={(app.screen.width - width * zoom) / 2 + offset.x}
      y={(app.screen.height - height * zoom) / 2 + offset.y}
      width={width}
      height={height}
      scale={zoom}
    >
      {tilemap.map((row, i) =>
        row.map((color, j) => (
          <pixiGraphics
            draw={(graphics) => {
              graphics.clear();
              graphics.setFillStyle({ color });
              graphics.rect(
                i * BASE_TILE_SIZE,
                j * BASE_TILE_SIZE,
                BASE_TILE_SIZE,
                BASE_TILE_SIZE,
              );
              graphics.fill();
            }}
          />
        )),
      )}
    </pixiContainer>
  );
}

export { Tilemap };

import { useProjectStore } from "../stores/project-store";
import { Application, extend } from "@pixi/react";
import { Container, Graphics, Rectangle } from "pixi.js";
import React from "react";

extend({
  Container,
  Graphics,
  Rectangle,
});

const BASE_TILE_SIZE = 30;
const GRID_SIZE = 10;

function Tilemap() {
  const canvasRef = React.useRef<HTMLDivElement>(null);
  const tilemap = useProjectStore((state) => state.tilemap);

  return (
    <div ref={canvasRef} className="w-96 h-96 bg-red-500">
      <Application resizeTo={canvasRef}>
        <pixiContainer
          x={0}
          y={0}
          width={BASE_TILE_SIZE * GRID_SIZE}
          height={BASE_TILE_SIZE * GRID_SIZE}
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
      </Application>
    </div>
  );
}

export { Tilemap };

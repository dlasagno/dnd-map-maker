// import { ComponentExample } from "@/components/component-example";
import { Tilemap } from "./components/tilemap";
import { useProjectStore } from "./stores/project-store";
import { Button } from "@/components/ui/button";

export function App() {
  const randomizeTilemap = useProjectStore((state) => state.randomizeTilemap);

  // return <ComponentExample />;
  return (
    <div className="flex flex-col items-center gap-4 p-4">
      <Button onClick={() => randomizeTilemap()}>Randomize Tilemap</Button>
      <Tilemap />
    </div>
  );
}

export default App;

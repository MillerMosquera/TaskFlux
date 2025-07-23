import {
  Excalidraw
  // ... Other imports ...
} from "@excalidraw/excalidraw";
import "@excalidraw/excalidraw/index.css";

export function ExcalidrawsView() {
    return (
        <div style={{ width: "100%", height: "100%" }}>
            <Excalidraw />
        </div>
    );
}

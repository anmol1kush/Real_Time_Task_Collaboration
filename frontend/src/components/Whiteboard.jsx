import { useEffect, useState, useRef } from "react";
import { Excalidraw, exportToCanvas } from "@excalidraw/excalidraw";

const Whiteboard = ({ socket, projectId }) => {
    const [excalidrawAPI, setExcalidrawAPI] = useState(null);
    const isUpdating = useRef(false);

    useEffect(() => {
        if (!socket || !excalidrawAPI) return;

        // Listen for incoming changes
        socket.on("whiteboard:updated", (elements) => {
            isUpdating.current = true;
            excalidrawAPI.updateScene({
                elements: elements,
            });
            // slight timeout to prevent onChange from firing and broadcasting back
            setTimeout(() => {
                isUpdating.current = false;
            }, 500);
        });

        return () => {
            socket.off("whiteboard:updated");
        };
    }, [socket, excalidrawAPI]);

    const handleChange = (elements, state) => {
        if (isUpdating.current) return;

        // Broadcast changes
        if (socket) {
            socket.emit("whiteboard:update", { projectId, elements });
        }
    };

    return (
        <div style={{ height: "600px", width: "100%" }} className="rounded-lg overflow-hidden border border-gray-700">
            <Excalidraw
                excalidrawAPI={(api) => setExcalidrawAPI(api)}
                onChange={handleChange}
                theme="dark"
            />
        </div>
    );
};

export default Whiteboard;

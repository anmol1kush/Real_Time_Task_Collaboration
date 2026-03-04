import { useEffect, useRef } from "react";
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import List from "@editorjs/list";
import Checklist from "@editorjs/checklist";

const DocumentEditor = ({ socket, projectId, documentId }) => {
  const editorInstance = useRef(null);
  const isReady = useRef(false);

  useEffect(() => {
    if (!editorInstance.current) {
      editorInstance.current = new EditorJS({
        holder: "editorjs",
        tools: {
          header: Header,
          list: List,
          checklist: Checklist,
        },
        placeholder: "Start typing your document here...",
        onReady: () => {
          isReady.current = true;
          // When ready, we might want to ask socket for initial data
          socket.emit("document:fetch", { projectId, documentId });
        },
        onChange: async (api, event) => {
          if (!isReady.current) return;
          const data = await api.saver.save();
          socket.emit("document:update", { projectId, documentId, data });
        },
      });
    }

    return () => {
      if (editorInstance.current && editorInstance.current.destroy && isReady.current) {
        editorInstance.current.destroy();
        editorInstance.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (!socket) return;

    socket.on("document:updated", (data) => {
      if (editorInstance.current && isReady.current) {
        // we use silent render to avoid circular onChange loops
        // Editor.js doesn't have an official "silent" render, so we just render it.
        // The onChange loop can be avoided by checking if data changed.
        editorInstance.current.render(data);
      }
    });

    return () => {
      socket.off("document:updated");
    };
  }, [socket]);

  return (
    <div className="bg-white text-black p-6 rounded-lg min-h-[500px]">
      <div id="editorjs" className="prose max-w-none"></div>
    </div>
  );
};

export default DocumentEditor;

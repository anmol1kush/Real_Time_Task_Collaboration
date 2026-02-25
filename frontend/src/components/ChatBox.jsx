import { useEffect, useState } from "react";

export default function ChatBox({ socket, projectId }) {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => {
    socket.on("project:history", setMessages);
    socket.on("project:message", (msg) =>
      setMessages((prev) => [...prev, msg])
    );

    return () => {
      socket.off("project:history");
      socket.off("project:message");
    };
  }, [socket]);

  const send = () => {
    socket.emit("project:message", { projectId, message: text });
    setText("");
  };

  return (
    <div>
      <div className="h-80 overflow-y-auto bg-gray-800 p-4 rounded mb-4">
        {messages.map((m, i) => (
          <div key={i}>
            <b>{m.senderName}</b>: {m.content.value}
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="flex-1 p-2 bg-gray-700 rounded"
        />
        <button
          onClick={send}
          className="bg-blue-600 px-4 rounded hover:bg-blue-700"
        >
          Send
        </button>
      </div>
    </div>
  );
}
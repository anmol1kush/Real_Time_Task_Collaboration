import { useEffect, useState } from "react";

export default function OnlineUsers({ socket }) {
  const [online, setOnline] = useState([]);

  useEffect(() => {
    socket.on("user:online", id =>
      setOnline(prev => [...new Set([...prev, id])])
    );

    socket.on("user:offline", id =>
      setOnline(prev => prev.filter(u => u !== id))
    );

    return () => {
      socket.off("user:online");
      socket.off("user:offline");
    };
  }, [socket]);

  return (
    <div className="text-sm text-green-400">
      Online users: {online.length}
    </div>
  );
}
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { connectSocket } from "../services/socket";

import Navbar from "../components/Navbar";
import ChatBox from "../components/ChatBox";
import KanbanBoard from "../components/KanbanBoard";
import InviteBox from "../components/InviteBox";
import OnlineUsers from "../components/OnlineUsers";

export default function Project() {
  const { projectId } = useParams();
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const s = connectSocket();
    s.emit("project:join", projectId);
    setSocket(s);

    return () => {
      s.disconnect();
    };
  }, [projectId]);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Navbar */}
      <Navbar />

      <div className="p-6 grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* LEFT PANEL */}
        <div className="lg:col-span-3 space-y-6">
          {/* Online users */}
          {socket && <OnlineUsers socket={socket} />}

          {/* Chat */}
          <div className="bg-gray-800 p-4 rounded-lg">
            <h2 className="text-lg font-semibold mb-3">Project Chat</h2>
            {socket && (
              <ChatBox socket={socket} projectId={projectId} />
            )}
          </div>

          {/* Kanban */}
          <div className="bg-gray-800 p-4 rounded-lg">
            <h2 className="text-lg font-semibold mb-3">Kanban Board</h2>
            <KanbanBoard projectId={projectId} />
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="lg:col-span-1">
          <InviteBox projectId={projectId} />
        </div>
      </div>
    </div>
  );
}
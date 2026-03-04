import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { connectSocket } from "../services/socket";

import Navbar from "../components/Navbar";
import ChatBox from "../components/ChatBox";
import KanbanBoard from "../components/KanbanBoard";
import InviteBox from "../components/InviteBox";
import OnlineUsers from "../components/OnlineUsers";
import DocumentEditor from "../components/DocumentEditor";
import Whiteboard from "../components/Whiteboard";
import Codespace from "../components/Codespace";

export default function Project() {
  const { projectId } = useParams();
  const [socket, setSocket] = useState(null);
  const [activeTab, setActiveTab] = useState("kanban");

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

          {/* Tabs */}
          <div className="flex gap-4 border-b border-gray-700 pb-2 mb-4">
            <button
              className={`px-4 py-2 font-medium transition-colors ${activeTab === 'kanban' ? 'text-blue-400 border-b-2 border-blue-400' : 'text-gray-400 hover:text-white'}`}
              onClick={() => setActiveTab('kanban')}
            >Kanban</button>
            <button
              className={`px-4 py-2 font-medium transition-colors ${activeTab === 'chat' ? 'text-blue-400 border-b-2 border-blue-400' : 'text-gray-400 hover:text-white'}`}
              onClick={() => setActiveTab('chat')}
            >Chat</button>
            <button
              className={`px-4 py-2 font-medium transition-colors ${activeTab === 'document' ? 'text-blue-400 border-b-2 border-blue-400' : 'text-gray-400 hover:text-white'}`}
              onClick={() => setActiveTab('document')}
            >Document</button>
            <button
              className={`px-4 py-2 font-medium transition-colors ${activeTab === 'whiteboard' ? 'text-blue-400 border-b-2 border-blue-400' : 'text-gray-400 hover:text-white'}`}
              onClick={() => setActiveTab('whiteboard')}
            >Whiteboard</button>
            <button
              className={`px-4 py-2 font-medium transition-colors ${activeTab === 'codespace' ? 'text-blue-400 border-b-2 border-blue-400' : 'text-gray-400 hover:text-white'}`}
              onClick={() => setActiveTab('codespace')}
            >Codespace</button>
          </div>

          <div className="bg-gray-800 p-4 rounded-lg min-h-[500px]">
            {activeTab === 'kanban' && <KanbanBoard projectId={projectId} />}
            {activeTab === 'chat' && socket && <ChatBox socket={socket} projectId={projectId} />}
            {activeTab === 'document' && socket && <DocumentEditor socket={socket} projectId={projectId} documentId={projectId} />}
            {activeTab === 'whiteboard' && socket && <Whiteboard socket={socket} projectId={projectId} />}
            {activeTab === 'codespace' && <Codespace projectId={projectId} />}
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
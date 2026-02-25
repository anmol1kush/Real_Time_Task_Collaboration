import { useState } from "react";
import api from "../services/api";

export default function InviteBox({ projectId }) {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");

  const sendInvite = async () => {
    await api.post(`/projects/${projectId}/invite`, { email });
    setMsg("Invite sent!");
    setEmail("");
  };

  return (
    <div className="bg-gray-800 p-4 rounded mt-6">
      <h3 className="font-semibold mb-2">Invite Member</h3>
      <input
        className="w-full mb-2 p-2 bg-gray-700 rounded"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <button
        onClick={sendInvite}
        className="bg-green-600 px-4 py-1 rounded"
      >
        Send Invite
      </button>
      {msg && <p className="text-green-400 mt-2">{msg}</p>}
    </div>
  );
}
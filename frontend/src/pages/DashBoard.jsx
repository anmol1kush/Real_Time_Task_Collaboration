import { useEffect, useState } from "react";
import api from "../services/api";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    api.get("/projects").then((res) => setProjects(res.data));
  }, []);

  return (
    <div className="p-6 bg-gray-900 min-h-screen text-white">
      <h1 className="text-3xl mb-6">My Projects</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {projects.map((p) => (
          <Link
            key={p.id}
            to={`/project/${p.id}`}
            className="bg-gray-800 p-4 rounded hover:bg-gray-700"
          >
            {p.name}
          </Link>
        ))}
      </div>
    </div>
  );
}
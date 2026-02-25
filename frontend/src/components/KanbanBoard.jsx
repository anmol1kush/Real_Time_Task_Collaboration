import { useEffect, useState } from "react";
import api from "../services/api";

const columns = ["TODO", "IN_PROGRESS", "DONE"];

export default function KanbanBoard({ projectId }) {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    api.get(`/projects/${projectId}/tasks`).then(res => setTasks(res.data));
  }, [projectId]);

  const moveTask = async (taskId, status) => {
    await api.put(`/tasks/${taskId}`, { status });
    setTasks(tasks.map(t => t.id === taskId ? { ...t, status } : t));
  };

  return (
    <div className="grid grid-cols-3 gap-4 mt-6">
      {columns.map(col => (
        <div key={col} className="bg-gray-800 p-3 rounded">
          <h3 className="text-center font-semibold mb-2">{col}</h3>
          {tasks.filter(t => t.status === col).map(task => (
            <div key={task.id} className="bg-gray-700 p-2 rounded mb-2">
              {task.title}
              <div className="flex gap-1 mt-2">
                {columns.map(c => (
                  <button
                    key={c}
                    onClick={() => moveTask(task.id, c)}
                    className="text-xs bg-gray-600 px-1 rounded"
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
import TaskCard from "../components/TaskCard";
import TaskForm from "../components/TaskForm";
import { useState, useEffect } from "react";
import { api } from "../services/api";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    // fetch tasks from API and setTasks
    const fetchTasks = async () => {
      try {
        const res = await api.get("/tasks");
        setTasks(res.data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, []);
  const todo = (tasks || []).filter((t) => t.status === "todo");
  const inProgress = (tasks || []).filter((t) => t.status === "in-progress");
  const done = (tasks || []).filter((t) => t.status === "done");

  const handleCreateTask = async (taskData) => {
    try {
      const res = await api.post("/tasks", taskData);
      setTasks((prev) => [...prev, res.data]);
    } catch (err) {
      console.error("Task creation failed:", err);
    }
  };
  const handleDelete = async (id) => {
    try {
      await api.delete(`/tasks/${id}`);

      setTasks((prev) => prev.filter((task) => task._id !== id));
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };
  const handleEdit = (task) => {
    console.log("Edit clicked:", task);
  };
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Task Dashboard</h1>

      <TaskForm onSubmit={handleCreateTask} />

      <div className="grid grid-cols-3 gap-4">
        {/* To Do */}

        <div className="bg-white p-4 rounded-xl shadow">
          <h2 className="font-semibold mb-3">To Do</h2>
          <div className="space-y-3">
            {todo.length === 0 ? (
              <p className="text-gray-400">No tasks</p>
            ) : (
              todo.map((task) => (
                <TaskCard
                  key={task._id}
                  task={task}
                  onDelete={handleDelete}
                  onEdit={handleEdit}
                />
              ))
            )}
          </div>
        </div>

        {/* In Progress */}

        <div className="bg-white p-4 rounded-xl shadow">
          <h2 className="font-semibold mb-3">In Progress</h2>
          <div className="space-y-3">
            {inProgress.length === 0 ? (
              <p className="text-gray-400">No tasks</p>
            ) : (
              inProgress.map((task) => (
                <TaskCard
                  key={task._id}
                  task={task}
                  onDelete={handleDelete}
                  onEdit={handleEdit}
                />
              ))
            )}
          </div>
        </div>

        {/* Done */}

        <div className="bg-white p-4 rounded-xl shadow">
          <h2 className="font-semibold mb-3">Done</h2>
          <div className="space-y-3">
            {done.length === 0 ? (
              <p className="text-gray-400">No tasks</p>
            ) : (
              done.map((task) => (
                <TaskCard
                  key={task._id}
                  task={task}
                  onDelete={handleDelete}
                  onEdit={handleEdit}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

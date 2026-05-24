import { useState } from "react";

export default function TaskCard({
  task,
  onDelete = () => {},
  onEdit = () => {},
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [status, setStatus] = useState(task.status);
  const [description, setDescription] = useState(task.description);

  function handleEdit() {
    setIsEditing(true);
  }
  function handleSave() {
    onEdit({ ...task, title, description, status });
    setIsEditing(false);
  }
  return (
    <div className="bg-white p-4 rounded-xl shadow-sm border hover:shadow-md transition">
      {isEditing ? (
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-1 rounded w-full"
        />
      ) : (
        <h4 className="text-md font-semibold text-gray-800">{task.title}</h4>
      )}
      {isEditing ? (
        <input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border p-1 rounded w-full"
        />
      ) : (
        <p className="text-sm text-gray-500 mt-1">{task.description}</p>
      )}

      {isEditing ? (
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="border p-1 rounded w-full"
        >
          <option value="todo">todo</option>
          <option value="in-progress">in-progress</option>
          <option value="done">done</option>
        </select>
      ) : (
        <span>{task.status}</span>
      )}
      <div className="flex justify-between mt-4">
        <button
          onClick={handleEdit}
          className="text-blue-500 text-sm hover:underline"
        >
          Edit
        </button>
        {isEditing ? (
          <button
            onClick={handleSave}
            className="text-blue-500 text-sm hover:underline"
          >
            Save
          </button>
        ) : (
          <button
            onClick={() => onDelete(task._id)}
            className="text-red-500 text-sm hover:underline"
          >
            Delete
          </button>
        )}
      </div>
    </div>
  );
}

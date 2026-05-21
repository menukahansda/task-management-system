export default function TaskCard({task, onDelete = () => {}, onEdit = () => {}
}) {
  return (
    <div className="bg-white p-4 rounded-xl shadow-sm border hover:shadow-md transition">
      
      <h4 className="text-md font-semibold text-gray-800">
        {task.title}
      </h4>

      <p className="text-sm text-gray-500 mt-1">
        {task.description}
      </p>
      <span>{task.status}</span>

      <div className="flex justify-between mt-4">
        <button
          onClick={() => onEdit(task)}
          className="text-blue-500 text-sm hover:underline"
        >
          Edit
        </button>

        <button
          onClick={() => onDelete(task._id)}
          className="text-red-500 text-sm hover:underline"
        >
          Delete
        </button>
      </div>

    </div>
  );
}
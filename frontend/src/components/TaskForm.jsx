export default function TaskForm({ onSubmit }) {
  const handleSubmit = (e) => {
    e.preventDefault();

    const form = new FormData(e.target);

    const taskData = {
      title: form.get("title"),
      description: form.get("description"),
      status: "todo",
    };

    onSubmit(taskData);
    e.target.reset();
  };

  return (
    <form className="bg-white p-4 rounded-xl shadow mb-6" onSubmit={handleSubmit}>
      
      <input
        name="title"
        type="text"
        placeholder="Title"
        className="w-full border p-2 rounded mb-2"
      />

      <textarea
        name="description"
        placeholder="Description"
        className="w-full border p-2 rounded mb-2"
      />

      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Create Task
      </button>

    </form>
  );
}
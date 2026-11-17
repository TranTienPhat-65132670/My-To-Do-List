import { useState } from "react";
import { Plus } from "lucide-react";
import useTaskStore from "../../stores/useTaskStore";

const AddTask = () => {
  const { addTask } = useTaskStore();
  const [title, setTitle] = useState("");

  const handleAddTask = () => {
    if (!title.trim()) return;
    addTask(title);
    setTitle("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleAddTask();
    }
  };

  return (
    <div className="flex items-center gap-2 w-full">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Nhập tên công việc cần làm..."
        className="flex-1 px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all shadow-xs"
      />
      <button
        disabled={!title.trim()}
        onClick={handleAddTask}
        className="flex items-center gap-1.5 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white font-semibold rounded-xl text-sm transition-all shadow-md shadow-indigo-100 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100"
      >
        <Plus className="w-4 h-4" />
        <span>Thêm</span>
      </button>
    </div>
  );
};

export default AddTask;

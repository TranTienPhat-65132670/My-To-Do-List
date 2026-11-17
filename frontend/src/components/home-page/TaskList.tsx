import { useState, useRef, useEffect } from "react";
import { CheckCircle2, Clock, Trash2, Pencil, Calendar } from "lucide-react";
import { cn } from "../../data/cn";
import useTaskStore from "../../stores/useTaskStore";

const TaskList = () => {
  const { tasks, submitTask, deleteTask, updateTask } = useTaskStore();

  // State quản lý việc đang sửa task nào và giá trị text hiện tại
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  // Tự động focus vào ô input khi chuyển sang chế độ sửa
  useEffect(() => {
    if (editingId && inputRef.current) {
      inputRef.current.focus();
    }
  }, [editingId]);

  const formatISOString = (dateInput: Date | string) => {
    if (!dateInput) return "";
    return new Intl.DateTimeFormat("vi-VN", {
      hour: "2-digit",
      minute: "2-digit",
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      timeZone: "Asia/Ho_Chi_Minh",
    }).format(new Date(dateInput));
  };

  // Bắt đầu sửa
  const handleStartEdit = (task: any) => {
    setEditingId(task._id);
    setEditValue(task.title);
  };

  // Lưu lại thay đổi
  const handleSaveEdit = async (taskId: string) => {
    if (!editValue.trim()) {
      setEditingId(null);
      return;
    }

    await updateTask(taskId, editValue);

    setEditingId(null);
  };

  // Xử lý phím Enter hoặc Escape
  const handleKeyDown = (e: React.KeyboardEvent, taskId: string) => {
    if (e.key === "Enter") {
      handleSaveEdit(taskId);
    } else if (e.key === "Escape") {
      setEditingId(null);
    }
  };

  return (
    <div className="flex flex-col gap-3 w-full">
      {tasks.map((task: any) => {
        const taskId = task._id;
        const isCompleted = task.status === "completed";
        const isEditing = editingId === taskId;

        return (
          <div
            key={taskId}
            onClick={() => console.log("Click vào task:", taskId)}
            className={cn(
              "group flex cursor-pointer items-center justify-between p-4 rounded-xl border transition-all shadow-2xs",
              isCompleted
                ? "bg-gray-50 border-gray-200 opacity-80"
                : "bg-white border-gray-200 hover:border-indigo-500 hover:shadow-xs",
            )}
          >
            {/* Phần thông tin bên trái */}
            <div className="flex items-center gap-3.5 flex-1 min-w-0">
              {/* Nút hoàn thành */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  submitTask(task._id, task.status);
                }}
                className={cn(
                  "flex items-center justify-center w-6 h-6 rounded-full border transition-all cursor-pointer shrink-0",
                  isCompleted
                    ? "bg-emerald-500 border-emerald-500 text-white"
                    : "border-gray-300 hover:border-indigo-600 text-transparent",
                )}
              >
                <CheckCircle2 className="w-4 h-4" />
              </button>

              <div className="flex flex-col flex-1 min-w-0">
                {isEditing ? (
                  /* Ô input khi đang sửa */
                  <input
                    ref={inputRef}
                    type="text"
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    onBlur={() => setEditingId(null)}
                    onKeyDown={(e) => handleKeyDown(e, taskId)}
                    onClick={(e) => e.stopPropagation()}
                    className="w-full text-sm font-medium text-gray-800 bg-white border border-indigo-500 rounded-lg px-2 py-1 outline-none shadow-xs"
                  />
                ) : (
                  /* Hiển thị title bình thường */
                  <span
                    className={cn(
                      "text-sm font-medium wrap-break-word",
                      isCompleted
                        ? "text-gray-400 line-through"
                        : "text-gray-800",
                    )}
                  >
                    {task.title}
                  </span>
                )}

                {/* Phần hiển thị thời gian */}
                <div className="flex flex-wrap items-center gap-3 mt-1 text-xs text-gray-400">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    <span>Tạo: {formatISOString(task.createdAt)}</span>
                  </div>

                  {isCompleted && task.completedAt && (
                    <div className="flex items-center gap-1 text-emerald-600 font-medium">
                      <Clock className="w-3 h-3" />
                      <span>Xong: {formatISOString(task.completedAt)}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Nhóm nút hành động: Hiện khi hover dòng */}
            <div
              className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 shrink-0 ml-2"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => handleStartEdit(task)}
                title="Chỉnh sửa công việc"
                className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all cursor-pointer"
              >
                <Pencil className="w-4 h-4" />
              </button>
              <button
                onClick={() => deleteTask(task._id)}
                title="Xóa công việc"
                className="p-2 text-gray-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all cursor-pointer"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TaskList;

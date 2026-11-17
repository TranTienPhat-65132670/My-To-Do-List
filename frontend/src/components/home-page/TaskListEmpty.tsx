import { ClipboardList } from "lucide-react";
import useTaskStore from "../../stores/useTaskStore";

const TaskListEmpty = () => {
  const { filterStatus } = useTaskStore();

  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
      <div className="w-16 h-16 bg-indigo-50 text-indigo-500 rounded-full flex items-center justify-center mb-4 shadow-inner">
        <ClipboardList className="w-8 h-8" />
      </div>
      <h3 className="text-base font-semibold text-gray-800 mb-1">
        Chưa có công việc nào{" "}
        {filterStatus === "active"
          ? "đang làm"
          : filterStatus === "completed"
            ? "hoàn thành"
            : ""}
      </h3>
      <p className="text-sm text-gray-500 max-w-sm text-balance">
        Hãy thêm công việc mới ở khung phía trên để bắt đầu quản lý ngày làm
        việc của bạn hiệu quả hơn nhé!
      </p>
    </div>
  );
};

export default TaskListEmpty;

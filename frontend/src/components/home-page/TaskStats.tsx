import { CheckCircle2, Clock } from "lucide-react";
import useTaskStore from "../../stores/useTaskStore";

const TaskStats = () => {
  const { activeCount, completedCount } = useTaskStore();

  return (
    <div className="flex items-center gap-1">
      {/* Badge chưa làm */}
      <div className="flex items-center gap-1 px-3.5 py-1 bg-blue-50 border border-blue-200 text-blue-800 rounded-full text-sm font-semibold">
        <Clock className="w-3 h-3" />
        <span>Chưa làm:</span>
        <span className="font-bold">{activeCount}</span>
      </div>

      {/* Badge đã xong */}
      <div className="flex items-center gap-1 px-3.5 py-1 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-full text-sm font-semibold">
        <CheckCircle2 className="w-3 h-3" />
        <span>Đã xong:</span>
        <span className="font-bold">{completedCount}</span>
      </div>
    </div>
  );
};

export default TaskStats;

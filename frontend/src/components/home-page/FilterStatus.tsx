import { data } from "../../data/data";
import { Filter } from "lucide-react";
import { cn } from "../../data/cn";
import useTaskStore from "../../stores/useTaskStore";

const FilterStatus = () => {
  const { filterStatus, setFilterStatus } = useTaskStore();

  return (
    <div className="flex items-center gap-1">
      {data.map((item) => {
        const isActive = filterStatus === item.value;
        return (
          <button
            key={item.value}
            onClick={() => setFilterStatus(item.value)}
            className={cn(
              "flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-sm font-semibold transition-all cursor-pointer border",
              isActive
                ? "bg-indigo-600 text-white border-indigo-600 shadow-indigo-100"
                : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50 hover:text-gray-900",
            )}
          >
            <Filter className="w-3.5 h-3.5" />
            <span>{item.label}</span>
          </button>
        );
      })}
    </div>
  );
};

export default FilterStatus;

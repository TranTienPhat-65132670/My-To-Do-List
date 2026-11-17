import { ChevronLeft, ChevronRight } from "lucide-react";
import useTaskStore from "../../stores/useTaskStore";
import { cn } from "../../data/cn";

const Pagination = () => {
  const { currentPage = 1, totalPages = 1, setPage } = useTaskStore();

  if (totalPages <= 1) return null;

  // Thuật toán tạo danh sách trang có dấu "..."
  const getPageNumbers = () => {
    const total = totalPages;
    const current = currentPage;

    if (total <= 7) {
      return Array.from({ length: total }, (_, i) => i + 1);
    }

    if (current <= 4) {
      return [1, 2, 3, 4, 5, "...", total];
    }

    if (current >= total - 3) {
      return [1, "...", total - 4, total - 3, total - 2, total - 1, total];
    }

    return [1, "...", current - 1, current, current + 1, "...", total];
  };

  return (
    <div className="flex items-center gap-1.5">
      {/* Nút Trước */}
      <button
        onClick={() => setPage(currentPage - 1)}
        disabled={currentPage === 1}
        className="flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-gray-600 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 hover:text-indigo-600 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition-all shadow-2xs"
      >
        <ChevronLeft className="w-3.5 h-3.5" />
        <span>Trước</span>
      </button>

      {/* Danh sách các số trang kèm dấu ... */}
      <div className="flex items-center gap-1">
        {getPageNumbers().map((page, index) => {
          if (page === "...") {
            return (
              <span
                key={`ellipsis-${index}`}
                className="w-8 h-8 text-xs font-medium text-gray-400 flex items-center justify-center select-none"
              >
                ...
              </span>
            );
          }

          const isSelected = currentPage === page;
          return (
            <button
              key={page}
              onClick={() => {
                if (typeof page === "number") {
                  setPage(page);
                }
              }}
              className={cn(
                "w-8 h-8 text-xs font-medium rounded-xl transition-all cursor-pointer shadow-2xs flex items-center justify-center",
                isSelected
                  ? "bg-indigo-600 text-white font-semibold shadow-indigo-100"
                  : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50 hover:text-indigo-600",
              )}
            >
              {page}
            </button>
          );
        })}
      </div>

      {/* Nút Sau */}
      <button
        onClick={() => setPage(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-gray-600 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 hover:text-indigo-600 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition-all shadow-2xs"
      >
        <span>Sau</span>
        <ChevronRight className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};

export default Pagination;

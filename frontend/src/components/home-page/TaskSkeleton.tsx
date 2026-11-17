const TaskSkeleton = () => {
  return (
    <div className="flex flex-col gap-3 w-full">
      {[1, 2, 3].map((item) => (
        <div
          key={item}
          className="flex items-center justify-between p-4 bg-white border border-gray-100 rounded-2xl shadow-2xs animate-pulse"
        >
          <div className="flex items-center gap-3 w-3/4">
            {/* Ô tròn giả lập checkbox */}
            <div className="w-5 h-5 bg-gray-200 rounded-lg shrink-0"></div>
            {/* Thanh chữ giả lập tiêu đề task */}
            <div className="h-4 bg-gray-200 rounded-md w-full max-w-60"></div>
          </div>
          <div className="flex items-center gap-2">
            {/* Các nút action giả lập bên phải */}
            <div className="w-7 h-7 bg-gray-200 rounded-lg"></div>
            <div className="w-7 h-7 bg-gray-200 rounded-lg"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TaskSkeleton;

import { memo } from "react";

const Header = () => {
  return (
    <div className="text-center space-y-2">
      <h1 className="text-4xl font-bold text-gray-800 tracking-tight">
        To-Do List
      </h1>
      <p className="text-sm italic text-gray-500">
        Không có việc gì khó, chỉ sợ mình không làm
      </p>
    </div>
  );
};

export default memo(Header);

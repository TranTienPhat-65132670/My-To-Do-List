import { useEffect } from "react";
import AddTask from "../components/home-page/AddTask";
import FilterStatus from "../components/home-page/FilterStatus";
import Header from "../components/home-page/Header";
import TaskList from "../components/home-page/TaskList";
import TaskListEmpty from "../components/home-page/TaskListEmpty";
import TaskStats from "../components/home-page/TaskStats";
import useTaskStore from "../stores/useTaskStore";
import Pagination from "../components/home-page/Pagination";
import DateTimeFilter from "../components/home-page/DateTimeFilter";
import TaskSkeleton from "../components/home-page/TaskSkeleton";

const HomePage = () => {
  const { tasks, getTasks, isLoading } = useTaskStore();

  useEffect(() => {
    getTasks();
  }, []);

  return (
    <div className="flex flex-col pt-10 items-center min-h-screen bg-gray-100">
      <div className="bg-white w-220 shadow-xl max-w-[95vw] border border-indigo-300 rounded-2xl p-6 flex flex-col gap-6">
        {/* Header */}
        <Header />

        {/* Thêm task */}
        <AddTask />

        {/* Đếm task và lọc trạng thái task */}
        <div className="flex flex-col gap-4 justify-between md:flex-row">
          <TaskStats />
          <FilterStatus />
        </div>

        <div className="h-px w-full bg-gray-200"></div>

        {/* Task list */}
        {isLoading ? (
          <TaskSkeleton />
        ) : tasks.length !== 0 ? (
          <TaskList />
        ) : (
          <TaskListEmpty />
        )}

        <div className="h-px w-full bg-gray-200"></div>

        {/* Phân trang và lọc thơi gian */}
        <div className="flex items-center gap-5 flex-col md:justify-between md:flex-row">
          <Pagination />
          <DateTimeFilter />
        </div>
      </div>
    </div>
  );
};

export default HomePage;

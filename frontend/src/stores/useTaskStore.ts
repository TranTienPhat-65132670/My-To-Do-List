import { create } from "zustand";
import type { TaskState } from "../types/State";
import { toastService } from "../services/toastServices";
import taskServices from "../services/taskServices";

const useTaskStore = create<TaskState>((set, get) => ({
  tasks: [],
  filterStatus: "all",
  activeCount: 0,
  completedCount: 0,
  timeRange: "all",
  currentPage: 1,
  totalPages: 1,
  isLoading: false,

  setFilterStatus: async (newState) => {
    set({ filterStatus: newState, currentPage: 1 });
    await get().getTasks();
  },

  setDateTimeFilter: async (timeRange) => {
    set({ timeRange, currentPage: 1 });
    await get().getTasks();
  },

  setPage: async (page) => {
    set({ currentPage: page });
    await get().getTasks();
  },

  addTask: async (title) => {
    try {
      await taskServices.addTask(title);

      await get().getTasks();

      toastService.success("Thêm task thành công");
    } catch (error) {
      console.error("Lỗi thêm task: " + error);
      toastService.error("Lỗi thêm task");
    }
  },

  getTasks: async () => {
    try {
      set({ isLoading: true });
      const { filterStatus, timeRange, currentPage } = get();
      const { tasks, activeCount, completedCount, pagination } =
        await taskServices.getTasks(filterStatus, timeRange, currentPage);

      set({
        tasks,
        activeCount,
        completedCount,
        totalPages: pagination.totalPages,
      });
    } catch (error) {
      console.error("Lỗi lấy tasks: " + error);
      toastService.error("Lỗi lấy tasks");
    } finally {
      set({ isLoading: false });
    }
  },

  submitTask: async (taskId, status) => {
    try {
      await taskServices.submitTask(taskId, status);

      await get().getTasks();

      toastService.success("Đã đánh dấu hoàn thành");
    } catch (error) {
      console.error("Lỗi submit task: " + error);
      toastService.error("Lỗi submit task");
    }
  },

  updateTask: async (taskId, title) => {
    try {
      await taskServices.updateTask(taskId, title);

      await get().getTasks();

      toastService.success("Cập nhật task thành công");
    } catch (error) {
      console.error("Lỗi update task: " + error);
      toastService.error("Lỗi submit tasks");
    }
  },

  deleteTask: async (taskId) => {
    try {
      await taskServices.deleteTask(taskId);

      await get().getTasks();

      toastService.success("Đã xóa task thành công");
    } catch (error) {
      console.error("Lỗi delete task: " + error);
      toastService.error("Lỗi delete task");
    }
  },
}));

export default useTaskStore;

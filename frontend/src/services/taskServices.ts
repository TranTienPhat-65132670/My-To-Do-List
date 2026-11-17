import { limitTaskPerPage } from "../data/data";
import api from "../lib/api";

const taskServices = {
  addTask: async (title: string) => {
    await api.post("/task", { title });
  },

  getTasks: async (filterStatus: string, timeRange: string, page: number) => {
    const res = await api.get(
      `/tasks?filterStatus=${filterStatus}&timeRange=${timeRange}&page=${page}&limit=${limitTaskPerPage}`,
    );
    return res.data;
  },

  submitTask: async (taskId: string, status: string) => {
    await api.put(`/submit-task/${taskId}`, { status });
  },

  updateTask: async (taskId: string, title: string) => {
    await api.put(`/task/${taskId}`, { title });
  },

  deleteTask: async (taskId: string) => {
    await api.delete(`/task/${taskId}`);
  },
};

export default taskServices;

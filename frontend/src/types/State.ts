interface Task {
  _id: string;
  title: string;
  status: string;
  completedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface TaskState {
  tasks: Task[];
  filterStatus: string;
  activeCount: number;
  completedCount: number;
  timeRange: string;
  currentPage: number;
  totalPages: number;
  isLoading: boolean;

  setFilterStatus: (newState: string) => Promise<void>;

  setDateTimeFilter: (timeRange: string) => Promise<void>;

  setPage: (page: number) => Promise<void>;

  addTask: (title: string) => Promise<void>;

  getTasks: () => Promise<void>;

  submitTask: (taskId: string, status: string) => Promise<void>;

  updateTask: (taskId: string, title: string) => Promise<void>;

  deleteTask: (taskId: string) => Promise<void>;
}

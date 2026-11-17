import Task from '../models/Task.js';

export const createTask = async (req, res) => {
  try {
    const { title } = req.body;
    if (!title) {
      return res.status(400).json({ message: 'Thiếu title để create task' });
    }

    await Task.create({ title });

    return res.sendStatus(201);
  } catch (error) {
    console.error('Lỗi create task: ' + error);
    return res.sendStatus(500);
  }
};

export const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title } = req.body;
    if (!id || !title) {
      return res.status(400).json({ message: 'Thiếu dữ liệu để update task' });
    }

    await Task.findByIdAndUpdate(id, { title });

    return res.sendStatus(200);
  } catch (error) {
    console.error('Lỗi update task: ' + error);
    return res.sendStatus(500);
  }
};

export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: 'Thiếu id để delete task' });
    }

    await Task.findByIdAndDelete(id);

    return res.sendStatus(200);
  } catch (error) {
    console.error('Lỗi delete task: ' + error);
    return res.sendStatus(500);
  }
};

export const getTasks = async (req, res) => {
  try {
    const {
      filterStatus = 'all',
      timeRange = 'all',
      page = 1,
      limit = 5,
    } = req.query;

    let pageNum = parseInt(page);
    const limitNum = parseInt(limit);

    const taskPipeline = [{ $sort: { createdAt: -1 } }];

    if (filterStatus && filterStatus !== 'all') {
      taskPipeline.push({ $match: { status: filterStatus } });
    }

    if (timeRange && timeRange !== 'all') {
      const startDate = new Date();
      startDate.setHours(0, 0, 0, 0);

      if (timeRange === 'week') {
        startDate.setDate(startDate.getDate() - 7);
      } else if (timeRange === 'month') {
        startDate.setMonth(startDate.getMonth() - 1);
      }

      taskPipeline.push({
        $match: {
          createdAt: { $gte: startDate },
        },
      });
    }

    // Chạy pipeline lần 1 để đếm tổng số task thỏa mãn bộ lọc hiện tại
    const countResult = await Task.aggregate([
      {
        $facet: {
          totalTasks: [...taskPipeline, { $count: 'count' }],
          activeCount: [{ $match: { status: 'active' } }, { $count: 'count' }],
          completedCount: [
            { $match: { status: 'completed' } },
            { $count: 'count' },
          ],
        },
      },
    ]);

    const totalTasks = countResult[0]?.totalTasks[0]?.count || 0;
    const activeCount = countResult[0]?.activeCount[0]?.count || 0;
    const completedCount = countResult[0]?.completedCount[0]?.count || 0;

    let totalPages = Math.ceil(totalTasks / limitNum) || 1;

    // TỰ ĐỘNG LÙI TRANG: Nếu trang hiện tại lớn hơn tổng số trang mới, ép về trang cuối cùng
    if (pageNum > totalPages) {
      pageNum = totalPages;
    }

    const skip = (pageNum - 1) * limitNum;

    // Chạy pipeline lần 2 để lấy dữ liệu đúng với pageNum đã được chuẩn hóa
    const tasksResult = await Task.aggregate([
      ...taskPipeline,
      { $skip: skip },
      { $limit: limitNum },
    ]);

    return res.status(200).json({
      tasks: tasksResult,
      pagination: {
        currentPage: pageNum,
        totalPages,
        totalTasks,
        limit: limitNum,
      },
      activeCount,
      completedCount,
    });
  } catch (error) {
    console.error('Lỗi get tasks: ' + error);
    return res.sendStatus(500);
  }
};

export const submitTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    if (!id || !status) {
      return res.status(400).json({ message: 'Thiếu dữ liệu để submit task' });
    }

    if (status === 'active') {
      await Task.findByIdAndUpdate(id, {
        status: 'completed',
        completedAt: new Date(),
      });
    } else {
      await Task.findByIdAndUpdate(id, {
        status: 'active',
        completedAt: null,
      });
    }

    return res.sendStatus(200);
  } catch (error) {
    console.error('Lỗi submit task: ' + error);
    return res.sendStatus(500);
  }
};

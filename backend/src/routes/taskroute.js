import express from 'express';
import {
  createTask,
  deleteTask,
  getTasks,
  submitTask,
  updateTask,
} from '../controllers/taskController.js';

const router = express.Router();

// base: /api

router.post('/task', createTask);

router.put('/task/:id', updateTask);

router.delete('/task/:id', deleteTask);

router.get('/tasks', getTasks);

router.put('/submit-task/:id', submitTask);

export default router;

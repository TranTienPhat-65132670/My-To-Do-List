import express from 'express';
import taskRoute from './routes/taskroute.js';
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(cors());

app.use('/api', taskRoute);

export default app;

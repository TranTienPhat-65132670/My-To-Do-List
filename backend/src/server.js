import app from './app.js';
import dotenv from 'dotenv/config';
import connectDB from './config/db.js';

const PORT = process.env.PORT ?? 5001;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server bắt đầu trên cổng ${PORT}`);
  });
});

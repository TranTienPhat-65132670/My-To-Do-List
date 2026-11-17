import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.CONNECTION_STR);

    console.log('Kết nối db thành công');
  } catch (error) {
    console.error('Lỗi kết nối db');
    process.exit(1);
  }
};

export default connectDB;

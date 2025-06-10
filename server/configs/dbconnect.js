import mongoose from 'mongoose';

mongoose.set('strictQuery', false);

const Dbconnect = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_URI);
    connect.connection.readyState === 1
      ? 'Kết nối thành công mongoose'
      : 'Lỗi kết nối Mongoose';
    console.log('Connected to database');
  } catch (error) {
    console.log('Error in connecting to database', error);
    throw new Error('Error in connecting to database', error);
  }
};

export default Dbconnect;

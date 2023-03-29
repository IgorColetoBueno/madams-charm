import mongoose from "mongoose";

const connectMongo = async () => {
  if (mongoose.connections[0].readyState) {
    return;
  }
  await mongoose.connect(process.env.MONGO_URI!, {
    waitQueueTimeoutMS: 20000
  });
};

export default connectMongo;

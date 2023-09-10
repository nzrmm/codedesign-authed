import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI || "";

const connection = async () => {
  try {
    const { connection } = await mongoose.connect(MONGO_URI);

    if (connection.readyState == 1) {
      return Promise.resolve(true);
    }
  } catch (error) {
    return Promise.reject(error);
  }
};

export default connection;

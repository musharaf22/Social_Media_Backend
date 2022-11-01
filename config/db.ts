import mongoose from "mongoose";

const connDb = async () => {
  try {
    const connect = await mongoose.connect(
      process.env.MONGO_URI
        ? process.env.MONGO_URI
        : "mongodb://localhost:27017/socialMedia"
    );
    if (connect) {
      console.log("Mongo Db IS Connected to", connect.connections[0].host);
    }
  } catch (error) {
    console.log(error);
  }
};

export default connDb;

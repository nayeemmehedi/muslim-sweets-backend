import mongoose from "mongoose";

const dbConnection = async () => {
  try {
    const mongooseConnection = await mongoose.connect(process.env.DB_NAME );
    console.log(
      `mongodb connected|| DB HOST : ${mongooseConnection.connection.host}`
    );
  } catch (error) {
    console.log(process.env.DB_NAME)
    console.log("Mongodb connection error: " + error);
    process.exit(1);
  }
};

export default dbConnection;

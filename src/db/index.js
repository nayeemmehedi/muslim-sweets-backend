import mongoose from "mongoose";

// const dbConnection = async () => {
//   try {
//     const mongooseConnection = await mongoose.connect(process.env.DB_NAME );
//     console.log(
//       `mongodb connected|| DB HOST : ${mongooseConnection.connection.host}`
//     );
//   } catch (error) {
//     console.log(process.env.DB_NAME)
//     console.log("Mongodb connection error: " + error);
//     process.exit(1);
//   }
// };

// export default dbConnection;

// import { app } from "./app.js";



import { MongoClient, ServerApiVersion } from 'mongodb';
import { app } from "../app.js";
const uri = "mongodb+srv://nayeemmehedi:nayeemmehedi41@cluster0.teacx.mongodb.net/muslim-sweets";



async function dbConnection() {
  try {
    await mongoose.connect(uri)
    // // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();
    // // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });
    // console.log("Pinged your deployment. You successfully connected to MongoDB!");
    // // app.listen(process.env.PORT ?? 4700);
  }catch(error){
    console.log(error)
  }
}

export default dbConnection;


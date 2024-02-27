import dbConnection from "./db/index.js";
import { app } from "./app.js";

dbConnection()
.then(() => {
  console.log("dbConnection called")
  app.listen(process.env.PORT || 4500);
}).catch(err=>{
    console.log("[index.js] error: " + err.message)
})




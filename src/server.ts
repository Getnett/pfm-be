require("dotenv").config();
import app from "./app";
import dbpool from "./db_pool";

const PORT = 3000;

const serverInstance = app();

dbpool
  .connect(process.env.DATABASE_URL || "")
  .then((_res) => {
    console.log("🚀 Established database database connection!");
    serverInstance.listen(PORT, () => {
      console.log(`Server is  running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.log(" ❌ Connection to database failed!");
    console.log("process.env.DATABASE_URL", process.env.DATABASE_URL);
    console.error(error);
  });

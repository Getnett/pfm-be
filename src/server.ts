require("dotenv").config();
import app from "./app";
import dbpool from "./db_pool";

const PORT = 3000;

const serverInstance = app();

serverInstance.get("/", (_req, res) => {
  // Send a response to the client
  res.send(`
   <html>
         <head>
           <title>Personal finance managment project</title>
         </head>
         <body>
          <h1>Personal finance managment app updated!</h1>
         </body>
    </html>`);
});

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
    console.error(error);
  });

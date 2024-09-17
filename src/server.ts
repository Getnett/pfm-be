import express from "express";

const app = express();

const port = 3000;

app.get("/", (req, res) => {
  // Send a response to the client
  res.send(`<html>
         <head>
           <title>Personal finance managment project</title>
         </head>
         <body>
          <h1>Personal finance managment app</h1>
         </body>
    </html>`);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

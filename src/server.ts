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

// Start the server and listen on the specified port
app.listen(port, () => {
  // Log a message when the server is successfully running
  console.log(`Server is running on http://localhost:${port}`);
});

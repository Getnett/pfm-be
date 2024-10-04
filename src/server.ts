import app from "./app";

const port = 3000;

const serverInstance = app();

serverInstance.get("/", (_req, res) => {
  // Send a response to the client
  res.send(`
   <html>
         <head>
           <title>Personal finance managment project</title>
         </head>
         <body>
          <h1>Personal finance managment app updated! almost ready for dev.</h1>
         </body>
    </html>`);
});

serverInstance.listen(port, () => {
  console.log(`Server is  running on http://localhost:${port}`);
});

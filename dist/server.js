"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
const app_1 = __importDefault(require("./app"));
const port = 3000;
const serverInstance = (0, app_1.default)();
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

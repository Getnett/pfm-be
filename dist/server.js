"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const port = 3000;
app.get("/", (req, res) => {
    // Send a response to the client
    res.send(`<html>
         <head>
           <title>Personal finance managment project</title>
         </head>
         <body>
          <h1>Personal finance managment app updated! almost ready for dev :)</h1>
         </body>
    </html>`);
});
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

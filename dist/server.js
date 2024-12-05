"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
const app_1 = __importDefault(require("./app"));
const db_pool_1 = __importDefault(require("./db_pool"));
const PORT = 3000;
const serverInstance = (0, app_1.default)();
db_pool_1.default
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

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const expenses_1 = __importDefault(require("./routes/expenses"));
exports.default = () => {
    const app = (0, express_1.default)();
    app.use(express_1.default.json());
    app.use(expenses_1.default);
    return app;
};

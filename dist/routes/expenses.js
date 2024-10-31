"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const expenses_1 = __importDefault(require("../repos/expenses"));
const router = express_1.default.Router();
router.get("/api/expenses", (_req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const resData = yield expenses_1.default.getAllExpenses();
        return res.status(200).send(resData);
    }
    catch (error) {
        next(error);
    }
}));
router.get("/api/expenses/:expenseId", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { expenseId } = req.params;
    try {
        const resData = yield expenses_1.default.getExpense(expenseId);
        return res.status(200).send(resData);
    }
    catch (error) {
        next(error);
    }
}));
router.post("/api/expenses", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    try {
        const resData = yield expenses_1.default.createExpense(body);
        return res.status(201).send(resData);
    }
    catch (error) {
        next(error);
    }
}));
router.delete("/api/expenses/:expenseId", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { expenseId } = req.params;
    try {
        yield expenses_1.default.deleteExpense(expenseId);
        return res.status(200).send("Expense deleted successfully");
    }
    catch (error) {
        next(error);
    }
}));
router.put("/api/expenses/:expenseId", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { expenseId } = req.params;
    const body = req.body;
    try {
        const resData = yield expenses_1.default.updateExpense(expenseId, body);
        return res.status(200).send(resData);
    }
    catch (error) {
        next(error);
    }
}));
exports.default = router;

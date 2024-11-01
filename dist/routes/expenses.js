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
const async_error_handler_1 = __importDefault(require("../middleware/async-error-handler"));
const router = express_1.default.Router();
router.get("/api/expenses", (0, async_error_handler_1.default)((_req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
    const resData = yield expenses_1.default.getAllExpenses();
    res.status(200).send(resData);
})));
router.get("/api/expenses/:expenseId", (0, async_error_handler_1.default)((req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
    const { expenseId } = req.params;
    const resData = yield expenses_1.default.getExpense(expenseId);
    res.status(200).send(resData);
})));
router.post("/api/expenses", (0, async_error_handler_1.default)((req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const resData = yield expenses_1.default.createExpense(body);
    res.status(201).send(resData);
})));
router.delete("/api/expenses/:expenseId", (0, async_error_handler_1.default)((req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
    const { expenseId } = req.params;
    yield expenses_1.default.deleteExpense(expenseId);
    res.status(200).send("Expense deleted successfully");
})));
router.put("/api/expenses/:expenseId", (0, async_error_handler_1.default)((req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
    const { expenseId } = req.params;
    const body = req.body;
    const resData = yield expenses_1.default.updateExpense(expenseId, body);
    res.status(200).send(resData);
})));
exports.default = router;

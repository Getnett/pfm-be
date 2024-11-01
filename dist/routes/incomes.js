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
const incomes_1 = __importDefault(require("../repos/incomes"));
const async_error_handler_1 = __importDefault(require("../middleware/async-error-handler"));
const router = express_1.default.Router();
router.get("/api/incomes", (0, async_error_handler_1.default)((_req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
    const resData = yield incomes_1.default.getAllIncomes();
    res.status(200).send(resData);
})));
router.get("/api/incomes/:incomeId", (0, async_error_handler_1.default)((req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
    const { incomeId } = req.params;
    const resData = yield incomes_1.default.getIncome(incomeId);
    res.status(200).send(resData);
})));
router.post("/api/incomes", (0, async_error_handler_1.default)((req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const resData = yield incomes_1.default.createIncome(body);
    res.status(201).send(resData);
})));
router.put("/api/incomes/:incomeId", (0, async_error_handler_1.default)((req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
    const { incomeId } = req.params;
    const body = req.body;
    const resData = yield incomes_1.default.updateIncome(incomeId, body);
    res.status(200).send(resData);
})));
router.delete("/api/incomes/:incomeId", (0, async_error_handler_1.default)((req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
    const { incomeId } = req.params;
    yield incomes_1.default.deleteIncome(incomeId);
    return res.status(200).send("Income deleted successfully");
})));
exports.default = router;

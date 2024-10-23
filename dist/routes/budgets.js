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
const budgets_1 = __importDefault(require("../repos/budgets"));
const router = express_1.default.Router();
router.get("/api/budgets/monthly/:month/:year", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { month, year } = req.params;
    try {
        const resData = yield budgets_1.default.getAllMonthlyBudgets(Number(month), Number(year));
        return res.status(200).send(resData);
    }
    catch (error) {
        next(error);
    }
}));
router.get("/api/budgets/yearly/:year", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { year } = req.params;
    try {
        const resData = yield budgets_1.default.getAllYearlyBudgets(Number(year));
        return res.status(200).send(resData);
    }
    catch (error) {
        next(error);
    }
}));
router.post("/api/budgets", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const payload = req.body;
    try {
        const resData = yield budgets_1.default.createMonthlyBudget(payload);
        return res.status(201).send(resData);
    }
    catch (error) {
        next(error);
    }
}));
router.patch("/api/budgets/:budgetId", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { budgetId } = req.params;
    const payload = req.body;
    try {
        const resData = yield budgets_1.default.updateBudget(budgetId, payload);
        return res.status(200).send(resData);
    }
    catch (error) {
        next(error);
    }
}));
router.delete("/api/budgets/:budgetId", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { budgetId } = req.params;
    try {
        const resData = yield budgets_1.default.deleteBudget(budgetId);
        res.status(200).send("Deleted successfully");
    }
    catch (error) {
        next(error);
    }
}));
exports.default = router;

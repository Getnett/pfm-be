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
const financial_goals_1 = __importDefault(require("../repos/financial_goals"));
const router = express_1.default.Router();
router.post("/api/financial_goals", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const payload = req.body;
    try {
        const resData = yield financial_goals_1.default.createFinancialGoal(payload);
        return res.status(201).send(resData);
    }
    catch (error) {
        next(error);
    }
}));
router.get("/api/financial_goals/:year", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { year } = req.params;
    try {
        const resData = yield financial_goals_1.default.getAllFinancialGoals(Number(year));
        return res.status(200).send(resData);
    }
    catch (error) {
        next(error);
    }
}));
router.patch("/api/financial_goals/:financialGoalId", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { financialGoalId } = req.params;
    const payload = req.body;
    try {
        const resData = yield financial_goals_1.default.updateFinancialGoal(financialGoalId, payload);
        return res.status(200).send(resData);
    }
    catch (error) {
        next(error);
    }
}));
router.delete("/api/financial_goals/:financialGoalId", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { financialGoalId } = req.params;
    try {
        const resData = yield financial_goals_1.default.deleteFinancialGoal(financialGoalId);
        return res.status(200).send("Successfully deleted!");
    }
    catch (error) {
        next(error);
    }
}));
exports.default = router;

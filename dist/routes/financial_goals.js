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
const async_error_handler_1 = __importDefault(require("../middleware/async-error-handler"));
const router = express_1.default.Router();
router.post("/api/financial_goals", (0, async_error_handler_1.default)((req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
    const payload = req.body;
    const resData = yield financial_goals_1.default.createFinancialGoal(payload);
    res.status(201).send(resData);
})));
router.get("/api/financial_goals/:year", (0, async_error_handler_1.default)((req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
    const { year } = req.params;
    const resData = yield financial_goals_1.default.getAllFinancialGoals(Number(year));
    res.status(200).send(resData);
})));
router.patch("/api/financial_goals/:financialGoalId", (0, async_error_handler_1.default)((req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
    const { financialGoalId } = req.params;
    const payload = req.body;
    const resData = yield financial_goals_1.default.updateFinancialGoal(financialGoalId, payload);
    res.status(200).send(resData);
})));
router.delete("/api/financial_goals/:financialGoalId", (0, async_error_handler_1.default)((req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
    const { financialGoalId } = req.params;
    yield financial_goals_1.default.deleteFinancialGoal(financialGoalId);
    res.status(200).send("Successfully deleted!");
})));
// Financial goal contributions
router.post("/api/financial_goals/contributions", (0, async_error_handler_1.default)((req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
    const payload = req.body;
    const resData = yield financial_goals_1.default.createFinancialGoalContrubutions(payload);
    res.status(201).send(resData);
})));
router.get("/api/financial_goals/contributions/:financialGoalId", (0, async_error_handler_1.default)((req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
    const { financialGoalId } = req.params;
    const resData = yield financial_goals_1.default.getAllContributionsForFinancialGoalContribution(Number(financialGoalId));
    res.status(200).send(resData);
})));
router.patch("/api/financial_goals/contributions/:goalContributionId", (0, async_error_handler_1.default)((req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
    const { goalContributionId } = req.params;
    const payload = req.body;
    const resData = yield financial_goals_1.default.updateFinancialGoalContribution(goalContributionId, payload);
    res.status(200).send(resData);
})));
router.delete("/api/financial_goals/contributions/:goalContributionId", (0, async_error_handler_1.default)((req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
    const { goalContributionId } = req.params;
    yield financial_goals_1.default.deleteFinancialGoalContribution(goalContributionId);
    res.status(200).send("Deleted successfully!");
})));
exports.default = router;

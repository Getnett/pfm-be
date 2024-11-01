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
const analytics_1 = __importDefault(require("../../repos/analytics/expenses/analytics"));
const async_error_handler_1 = __importDefault(require("../../middleware/async-error-handler"));
const router = express_1.default.Router();
router.get("/api/analytics/expenses/monthly_data", (0, async_error_handler_1.default)((req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
    const { month, year } = req.query;
    const resData = yield analytics_1.default.getMonthlyAnalytics(Number(month), Number(year));
    res.status(200).send(resData);
})));
router.get("/api/analytics/expenses/monthly_daily_spend", (0, async_error_handler_1.default)((req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
    const { month, year } = req.query;
    const resData = yield analytics_1.default.getMonthlyDailySpend(Number(month), Number(year));
    res.status(200).send(resData);
})));
router.get("/api/analytics/expenses/yearly_data", (0, async_error_handler_1.default)((req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
    const { year } = req.query;
    const resData = yield analytics_1.default.getYearlyAnalytics(Number(year));
    res.status(200).send(resData);
})));
router.get("/api/analytics/expenses/yearly_monthly_spend", (0, async_error_handler_1.default)((req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
    const { year } = req.query;
    const resData = yield analytics_1.default.getYearlyMonthlySpend(Number(year));
    res.status(200).send(resData);
})));
exports.default = router;

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
const router = express_1.default.Router();
router.get("/api/analytics/expenses/monthly_data", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { month, year } = req.query;
    try {
        const resData = yield analytics_1.default.getMontlyAnalytics(Number(month), Number(year));
        return res.status(200).send(resData);
    }
    catch (error) {
        next(error);
    }
}));
router.get("/api/analytics/expenses/monthly_daily_spend", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { month, year } = req.query;
    try {
        const resData = yield analytics_1.default.getMontlyDailySpend(Number(month), Number(year));
        return res.status(200).send(resData);
    }
    catch (error) {
        next(error);
    }
}));
router.get("/api/analytics/expenses/yearly_data", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { year } = req.query;
        const resData = yield analytics_1.default.getYearlyAnalytics(Number(year));
        return res.status(200).send(resData);
    }
    catch (error) {
        next(error);
    }
}));
exports.default = router;

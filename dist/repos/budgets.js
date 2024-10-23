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
const db_pool_1 = __importDefault(require("../db_pool"));
const to_camel_case_1 = __importDefault(require("../utils/to-camel-case"));
class BudgetRepo {
    static createMonthlyBudget(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const { amount, period, startDate, endDate, categoryId } = payload;
            const { rows } = yield db_pool_1.default.query(`
       INSERT INTO budgets (amount,period,start_date,end_date,user_id,category_id) 
       VALUES ($1,$2,$3,$4,$5,$6) RETURNING *;
     `, [amount, period, startDate, endDate, 1, categoryId]);
            return (0, to_camel_case_1.default)(rows)[0];
        });
    }
    static getAllMonthlyBudgets(month, year) {
        return __awaiter(this, void 0, void 0, function* () {
            const { rows } = yield db_pool_1.default.query(`
      SELECT category_name,SUM(budgets.amount)AS limit,SUM(expenses.amount) AS total_spent FROM budgets
      JOIN categories ON budgets.category_id = categories.id
      LEFT JOIN expenses ON expenses.category_id = budgets.category_id
      WHERE  period = 'month' AND  EXTRACT(MONTH FROM budgets.start_date) = $1 AND EXTRACT(YEAR FROM start_date) = $2
      GROUP BY categories.category_name
     `, [month, year]);
            return (0, to_camel_case_1.default)(rows);
        });
    }
    static getAllYearlyBudgets(year) {
        return __awaiter(this, void 0, void 0, function* () {
            const { rows } = yield db_pool_1.default.query(`
      SELECT category_name,SUM(budgets.amount)AS limit,SUM(expenses.amount) AS total_spent FROM budgets
      JOIN categories ON budgets.category_id = categories.id
      LEFT JOIN expenses ON expenses.category_id = budgets.category_id
      WHERE  period = 'year'AND EXTRACT(YEAR FROM start_date) = $1
      GROUP BY categories.category_name
     `, [year]);
            return (0, to_camel_case_1.default)(rows);
        });
    }
    static updateBudget(id, payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const { amount } = payload;
            const { rows } = yield db_pool_1.default.query("UPDATE budgets SET amount = $1 WHERE id = $2 RETURNING *;", [amount, id]);
            return (0, to_camel_case_1.default)(rows)[0];
        });
    }
    static deleteBudget(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const { rows } = yield db_pool_1.default.query("DELETE FROM budgets WHERE  id = $1", [
                id,
            ]);
            return (0, to_camel_case_1.default)(rows)[0];
        });
    }
}
exports.default = BudgetRepo;

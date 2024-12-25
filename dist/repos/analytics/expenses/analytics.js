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
const db_pool_1 = __importDefault(require("../../../db_pool"));
const to_camel_case_1 = __importDefault(require("../../../utils/to-camel-case"));
class ExpenseAnalytics {
    static getMonthlyAnalytics(month, year) {
        return __awaiter(this, void 0, void 0, function* () {
            const { rows } = yield db_pool_1.default.query(`
      WITH expense_transaction  AS (SELECT 
        DATE(date) AS transaction_date,
        SUM(amount) AS total
        FROM expenses 
        WHERE EXTRACT(YEAR FROM date) = 2024 AND EXTRACT(MONTH FROM date) = 12
        GROUP BY DATE(date)
        ),
         income_transaction  AS (
        SELECT 
        DATE(date) AS transaction_date,
        SUM(amount) AS total
        FROM incomes
        WHERE EXTRACT(YEAR FROM date) = 2024 AND EXTRACT(MONTH FROM date) = 12
        GROUP BY DATE(date)
        ),
        exp_trans AS (
        SELECT * FROM expenses
        JOIN categories ON categories.id = expenses.category_id
        JOIN expense_transaction ON  DATE(expenses.date) = expense_transaction.transaction_date
        ),
        income_trans AS (
        SELECT * FROM incomes
        JOIN income_sources ON income_sources.id = incomes.income_sources_id
        JOIN income_transaction ON DATE(incomes.date) = income_transaction.transaction_date
        ) 
        
        
        SELECT distinct *   FROM exp_trans
        JOIN income_trans ON income_trans.transaction_date = exp_trans.transaction_date;
        
    `, [month, year]);
            return (0, to_camel_case_1.default)(rows);
        });
    }
    static getMonthlyDailySpend(month, year) {
        return __awaiter(this, void 0, void 0, function* () {
            const { rows } = yield db_pool_1.default.query(`
      SELECT amount,TO_CHAR(date,'DD mon') AS date FROM expenses WHERE EXTRACT(MONTH FROM date) = $1 AND EXTRACT(YEAR FROM date) = $2
    `, [month, year]);
            return (0, to_camel_case_1.default)(rows);
        });
    }
    static getYearlyAnalytics(year) {
        return __awaiter(this, void 0, void 0, function* () {
            const { rows } = yield db_pool_1.default.query(`
    SELECT SUM(amount) AS total,category_name,ROUND(SUM(amount)::numeric/(SELECT SUM(amount) FROM expenses) * 100,2) AS percentage
    FROM expenses 
    JOIN  categories ON  expenses.category_id = categories.id 
    WHERE EXTRACT(YEAR FROM date) = $1
    GROUP BY category_name;
    `, [year]);
            return (0, to_camel_case_1.default)(rows);
        });
    }
    static getYearlyMonthlySpend(year) {
        return __awaiter(this, void 0, void 0, function* () {
            const { rows } = yield db_pool_1.default.query(`SELECT SUM(amount) AS total,TO_CHAR(date,'DD mon') AS month FROM expenses GROUP BY month`);
            return (0, to_camel_case_1.default)(rows);
        });
    }
}
exports.default = ExpenseAnalytics;

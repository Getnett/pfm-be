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
        WITH  total_sum  AS (
        SELECT SUM(amount) FROM  expenses
        WHERE EXTRACT(MONTH FROM date) = $1
        )
        SELECT SUM(amount) AS total,category_name,categories.id  AS cat_id, ROUND(SUM(amount)::numeric/(SELECT * FROM total_sum) * 100,2) AS percentage
        FROM expenses 
        JOIN  categories ON  expenses.category_id = categories.id 
        WHERE  EXTRACT(MONTH FROM date) = $1 AND EXTRACT(YEAR FROM date) = $2
        GROUP BY category_name,categories.id;
        
    `, [month, year]);
            return (0, to_camel_case_1.default)(rows);
        });
    }
    static getMonthlyDailySpend(month, year) {
        return __awaiter(this, void 0, void 0, function* () {
            const { rows } = yield db_pool_1.default.query(`
      SELECT SUM(amount) AS amount,TO_CHAR(date,'DD mon') AS date FROM expenses 
      WHERE EXTRACT(MONTH FROM date) = $1 AND EXTRACT(YEAR FROM date) = $2 
      GROUP BY TO_CHAR(date,'DD mon');
    `, [month, year]);
            return (0, to_camel_case_1.default)(rows);
        });
    }
    static getYearlyAnalytics(year) {
        return __awaiter(this, void 0, void 0, function* () {
            const { rows } = yield db_pool_1.default.query(`
    WITH  total_sum  AS (
    SELECT SUM(amount) FROM  expenses
    WHERE EXTRACT(YEAR FROM date) = $1
    )
    SELECT SUM(amount) AS total,category_name,categories.id AS cat_id,$1 AS year,ROUND(SUM(amount)::numeric/(SELECT * FROM total_sum) * 100,2) AS percentage
    FROM expenses 
    JOIN  categories ON  expenses.category_id = categories.id 
    WHERE EXTRACT(YEAR FROM date) = $1
    GROUP BY category_name,categories.id;
    `, [year]);
            return (0, to_camel_case_1.default)(rows);
        });
    }
    static getYearlyExpenseAnalyticsByCategory(catId, year) {
        return __awaiter(this, void 0, void 0, function* () {
            const { rows } = yield db_pool_1.default.query(`
        WITH  total_sum  AS (
        SELECT SUM(amount) FROM  expenses
        WHERE expenses.category_id = $1 AND EXTRACT(YEAR FROM date) = $2
        )
        SELECT expenses.id as expense_id, note,category_name,TO_CHAR(date,'DD mon') AS date,amount, ROUND(amount::numeric / (SELECT * FROM total_sum) * 100,2) AS percentage  
        FROM expenses 
        JOIN categories ON expenses.category_id = categories.id
        WHERE expenses.category_id = $1 AND EXTRACT(YEAR FROM date) = $2;
      
       
        `, [catId, year]);
            return (0, to_camel_case_1.default)(rows);
        });
    }
    // monthly
    static getMonthlyExpenseAnalyticsByCategory(catId, month, year) {
        return __awaiter(this, void 0, void 0, function* () {
            const { rows } = yield db_pool_1.default.query(`
        WITH  total_sum  AS (
        SELECT SUM(amount) FROM  expenses
        WHERE expenses.category_id = $1 AND EXTRACT(MONTH FROM date) = $2 AND EXTRACT(YEAR FROM date) = $3
        )
        SELECT expenses.id as expense_id, note,category_name,TO_CHAR(date,'DD mon') AS date,amount, ROUND(amount::numeric / (SELECT * FROM total_sum) * 100,2) AS percentage  
        FROM expenses 
        JOIN categories ON expenses.category_id = categories.id
        WHERE expenses.category_id = $1 AND EXTRACT(MONTH FROM date) = $2 AND EXTRACT(YEAR FROM date) = $3;
      `, [catId, month, year]);
            return (0, to_camel_case_1.default)(rows);
        });
    }
    static getYearlyMonthlySpend(year) {
        return __awaiter(this, void 0, void 0, function* () {
            const { rows } = yield db_pool_1.default.query(`
      SELECT SUM(amount) AS total,TO_CHAR(date,'DD mon') AS month FROM expenses
      WHERE EXTRACT(YEAR FROM date) = $1
      GROUP BY month`, [year]);
            return (0, to_camel_case_1.default)(rows);
        });
    }
    static getMonthlyTotalSpend(month, year) {
        return __awaiter(this, void 0, void 0, function* () {
            const { rows } = yield db_pool_1.default.query("SELECT SUM(amount) AS total FROM expenses WHERE  EXTRACT(MONTH FROM date) = $1 AND EXTRACT(YEAR FROM date) = $2;", [month, year]);
            return (0, to_camel_case_1.default)(rows)[0];
        });
    }
}
exports.default = ExpenseAnalytics;

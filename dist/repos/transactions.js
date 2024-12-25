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
class TransactionsRepo {
    static getTransactions(month, year) {
        return __awaiter(this, void 0, void 0, function* () {
            const { rows } = yield db_pool_1.default.query(`WITH expense_transaction  AS (SELECT 
        TO_CHAR(expenses.date, 'Mon DD Day') AS transaction_date,
        SUM(amount) AS total,
        'expense' AS type
        FROM expenses 
        WHERE EXTRACT(YEAR FROM date) = $2 AND EXTRACT(MONTH FROM date) = $1
        GROUP BY TO_CHAR(expenses.date,'Mon DD Day')
        ),
         income_transaction  AS (
        SELECT 
        TO_CHAR(incomes.date, 'Mon DD Day')  AS transaction_date,
        SUM(amount) AS total,
        'income' AS type
        FROM incomes
        WHERE EXTRACT(YEAR FROM date) = $2 AND EXTRACT(MONTH FROM date) = $1
        GROUP BY TO_CHAR(incomes.date,'Mon DD Day')
        ),
        exp_trans AS (
        SELECT id,amount,note,date,transaction_date,total,type FROM expenses
        JOIN expense_transaction ON TO_CHAR(expenses.date, 'Mon DD Day')  = expense_transaction.transaction_date
        ),
        income_trans AS (
        SELECT id,amount,note,date,transaction_date,total,type FROM incomes
         JOIN income_transaction ON TO_CHAR(incomes.date, 'Mon DD Day')  = income_transaction.transaction_date
        ) 
        
        SELECT * FROM exp_trans
        UNION ALL 
        SELECT * FROM income_trans;
        `, [month, year]);
            return (0, to_camel_case_1.default)(rows);
        });
    }
}
exports.default = TransactionsRepo;

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
class IncomeAnalytics {
    static getMonthlyAnalytics(month, year) {
        return __awaiter(this, void 0, void 0, function* () {
            const { rows } = yield db_pool_1.default.query(`
    SELECT SUM(amount) AS total,income_source,income_sources.id AS ics_id,ROUND(SUM(amount)::numeric/(SELECT SUM(amount) FROM incomes) * 100,2) AS percentage
    FROM incomes 
    JOIN  income_sources ON  incomes.income_sources_id = income_sources.id 
    WHERE EXTRACT(MONTH FROM date) = $1 AND EXTRACT(YEAR FROM date) = $2
    GROUP BY income_source,income_sources.id;
    
    `, [month, year]);
            return (0, to_camel_case_1.default)(rows);
        });
    }
    static getMonthlyDailySourceIncomes(month, year) {
        return __awaiter(this, void 0, void 0, function* () {
            const { rows } = yield db_pool_1.default.query(`
      SELECT SUM(amount) AS amount,TO_CHAR(date,'DD mon') AS date FROM incomes 
      WHERE EXTRACT(MONTH FROM date) = $1 AND EXTRACT(YEAR FROM date) = $2
      GROUP BY TO_CHAR(date,'DD mon')
    `, [month, year]);
            return (0, to_camel_case_1.default)(rows);
        });
    }
    static getTotalMonthlyIncome(month, year) {
        return __awaiter(this, void 0, void 0, function* () {
            const { rows } = yield db_pool_1.default.query("SELECT SUM(amount) AS total FROM incomes WHERE EXTRACT(MONTH FROM date) = $1 AND EXTRACT(YEAR FROM date) = $2", [month, year]);
            return (0, to_camel_case_1.default)(rows)[0];
        });
    }
    // yearly info
    static getYearlyIncomeAnalyticsByIncomeSource(icsId, year) {
        return __awaiter(this, void 0, void 0, function* () {
            const { rows } = yield db_pool_1.default.query(`
        WITH  total_sum  AS (
        SELECT SUM(amount) FROM  incomes
        WHERE incomes.income_sources_id = $1 AND EXTRACT(YEAR FROM date) = $2
        )
        SELECT incomes.id as income_id, note,income_source,TO_CHAR(date,'DD mon') AS date,amount, ROUND(amount::numeric / (SELECT * FROM total_sum) * 100,2) AS percentage  
        FROM incomes 
        JOIN income_sources ON incomes.income_sources_id = income_sources.id
        WHERE incomes.income_sources_id = $1 AND EXTRACT(YEAR FROM date) = $2;
      
       
        `, [icsId, year]);
            return (0, to_camel_case_1.default)(rows);
        });
    }
    static getYearlyAnalytics(year) {
        return __awaiter(this, void 0, void 0, function* () {
            const { rows } = yield db_pool_1.default.query(`
    WITH  total_sum  AS (
    SELECT SUM(amount) FROM  incomes
    WHERE EXTRACT(YEAR FROM date) = $1
    )
    SELECT SUM(amount) AS total,income_source,income_sources.id AS ics_id,$1 AS year, ROUND(SUM(amount)::numeric/(SELECT * FROM total_sum) * 100,2) AS percentage
    FROM incomes 
    JOIN  income_sources ON  incomes.income_sources_id = income_sources.id   
    WHERE EXTRACT(YEAR FROM date) = $1
    GROUP BY income_source,income_sources.id;
    `, [year]);
            return (0, to_camel_case_1.default)(rows);
        });
    }
    static getYearlyMontlyIncomeSources(year) {
        return __awaiter(this, void 0, void 0, function* () {
            const { rows } = yield db_pool_1.default.query(`
      SELECT SUM(amount) AS total,TO_CHAR(date,'DD mon') AS month FROM incomes 
      WHERE EXTRACT(YEAR FROM date) = $1
      GROUP BY month `, [year]);
            return (0, to_camel_case_1.default)(rows);
        });
    }
}
exports.default = IncomeAnalytics;

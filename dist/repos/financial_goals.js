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
class FinancialGoalRepo {
    static createFinancialGoal(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const { goalName, targetAmount, deadline } = payload;
            const { rows } = yield db_pool_1.default.query(`INSERT INTO financial_goals (goal_name,target_amount,deadline,user_id) VALUES ($1,$2,$3,$4) RETURNING *;`, [goalName, targetAmount, deadline, 1]);
            return (0, to_camel_case_1.default)(rows)[0];
        });
    }
    static getAllFinancialGoals(year) {
        return __awaiter(this, void 0, void 0, function* () {
            const { rows } = yield db_pool_1.default.query(`SELECT * FROM financial_goals WHERE EXTRACT(YEAR FROM deadline) = $1; `, [year]);
            return (0, to_camel_case_1.default)(rows);
        });
    }
    static updateFinancialGoal(id, payload) {
        return __awaiter(this, void 0, void 0, function* () {
            let query = "UPDATE financial_goals SET";
            let fieldsToUpdate = [];
            let values = [];
            Object.keys(payload).forEach((field, index) => {
                const snakeCase = field.replace(/[A-Z]/g, ($1) => $1.toLowerCase().replace("", "_"));
                fieldsToUpdate.push(`${snakeCase} = $${index + 1}`);
                values.push(payload[field]);
            });
            query =
                query +
                    " " +
                    fieldsToUpdate +
                    " " +
                    `WHERE id = $${fieldsToUpdate.length + 1} RETURNING *;`;
            values.push(id);
            const { rows } = yield db_pool_1.default.query(query, values);
            return (0, to_camel_case_1.default)(rows)[0];
        });
    }
    static deleteFinancialGoal(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const { rows } = yield db_pool_1.default.query(` DELETE FROM financial_goals WHERE id = $1 RETURNING *;
     `, [id]);
            return (0, to_camel_case_1.default)(rows)[0];
        });
    }
}
exports.default = FinancialGoalRepo;

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
class ExpensesRepo {
    static getAllExpenses() {
        return __awaiter(this, void 0, void 0, function* () {
            const { rows } = yield db_pool_1.default.query("SELECT * FROM expenses;");
            return (0, to_camel_case_1.default)(rows);
        });
    }
    static getExpense(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const { rows } = yield db_pool_1.default.query("SELECT * FROM expenses WHERE id = $1;", [id]);
            return (0, to_camel_case_1.default)(rows)[0];
        });
    }
    static createExpense(reqBody) {
        return __awaiter(this, void 0, void 0, function* () {
            const { amount, date, note, categoryId, accountId } = reqBody;
            const { rows } = yield db_pool_1.default.query(`
    INSERT INTO expenses  (amount,date,note,user_id,category_id,account_id)  VALUES ($1,$2,$3,$4,$5,$6) RETURNING *;
    `, [amount, date, note, 1, categoryId, accountId]);
            return (0, to_camel_case_1.default)(rows)[0];
        });
    }
    // reqBody change type
    static updateExpense(id, reqBody) {
        return __awaiter(this, void 0, void 0, function* () {
            let query = "UPDATE expenses SET";
            const fieldsToUpdate = [];
            const values = [];
            Object.keys(reqBody).forEach((key, index) => {
                const snakeCase = key.replace(/[A-Z]/g, ($1) => $1.toLowerCase().replace("", "_"));
                console.log(snakeCase);
                fieldsToUpdate.push(`${snakeCase} = $${index + 1}`);
                values.push(reqBody[key]);
            });
            query =
                query +
                    " " +
                    fieldsToUpdate.join(", ") +
                    ` WHERE id = $${fieldsToUpdate.length + 1} RETURNING *;`;
            values.push(id);
            const { rows } = yield db_pool_1.default.query(query.toString(), values);
            return (0, to_camel_case_1.default)(rows)[0];
        });
    }
    static deleteExpense(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const { rows } = yield db_pool_1.default.query("DELETE FROM expenses WHERE id = $1 RETURNING *;", [id]);
            return (0, to_camel_case_1.default)(rows)[0];
        });
    }
}
exports.default = ExpensesRepo;

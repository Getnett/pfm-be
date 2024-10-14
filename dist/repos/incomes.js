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
class IncomesRepo {
    static getAllIncomes() {
        return __awaiter(this, void 0, void 0, function* () {
            const { rows } = yield db_pool_1.default.query("SELECT * FROM incomes;");
            return (0, to_camel_case_1.default)(rows);
        });
    }
    static getIncome(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const { rows } = yield db_pool_1.default.query("SELECT * FROM expenses WHERE id = $1", [id]);
            return (0, to_camel_case_1.default)(rows)[0];
        });
    }
    static createIncome(reqBody) {
        return __awaiter(this, void 0, void 0, function* () {
            const { amount, note, date, incomeSourcesId, accountId } = reqBody;
            let rowsData = [];
            // check if there is a better way
            if (date) {
                const { rows } = yield db_pool_1.default.query(`INSERT INTO incomes (amount,note,date,user_id,income_sources_id,account_id) 
         VALUES 
         ($1,$2,$3,$4,$5,$6)
         RETURNING *;
        `, [amount, note, date, 1, incomeSourcesId, accountId]);
                rowsData = rows;
            }
            else {
                const { rows } = yield db_pool_1.default.query(`INSERT INTO incomes (amount,note,user_id,income_sources_id,account_id) 
         VALUES 
         ($1,$2,$3,$4,$5)
         RETURNING *;
        `, [amount, note, 1, incomeSourcesId, accountId]);
                rowsData = rows;
            }
            return (0, to_camel_case_1.default)(rowsData)[0];
        });
    }
    static updateIncome(id, reqBody) {
        return __awaiter(this, void 0, void 0, function* () {
            let query = "UPDATE incomes SET";
            const fieldsToUpdate = [];
            const values = [];
            Object.keys(reqBody).forEach((key, index) => {
                const snakeCasedField = key.replace(/[A-Z]/g, ($1) => $1.toLowerCase().replace("", "_"));
                fieldsToUpdate.push(`${snakeCasedField} = $${index + 1}`);
                values.push(reqBody[key]);
            });
            values.push(id);
            query =
                query +
                    " " +
                    fieldsToUpdate.join(", ") +
                    ` WHERE id = $${fieldsToUpdate.length + 1} RETURNING *;`;
            const { rows } = yield db_pool_1.default.query(query, values);
            return (0, to_camel_case_1.default)(rows)[0];
        });
    }
    static deleteIncome(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const { rows } = yield db_pool_1.default.query("DELETE FROM  incomes WHERE id = $1 RETURNING *", [id]);
            return (0, to_camel_case_1.default)(rows)[0];
        });
    }
}
exports.default = IncomesRepo;

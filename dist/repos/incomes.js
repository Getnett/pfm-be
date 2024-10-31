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
            const { rows } = yield db_pool_1.default.query("SELECT * FROM incomes WHERE id = $1", [
                id,
            ]);
            return (0, to_camel_case_1.default)(rows)[0];
        });
    }
    static createIncome(reqBody) {
        return __awaiter(this, void 0, void 0, function* () {
            const { amount, note, date, incomeSourcesId, accountId } = reqBody;
            let rowsData = [];
            // check if there is a better way
            if (date) {
                yield db_pool_1.default.query("BEGIN;");
                yield db_pool_1.default.query(`UPDATE accounts SET balance = balance + $1 WHERE id = $2`, [amount, accountId || 1]);
                const { rows } = yield db_pool_1.default.query(`INSERT INTO incomes (amount,note,date,user_id,income_sources_id,account_id) 
         VALUES 
         ($1,$2,$3,$4,$5,$6)
         RETURNING *;
        `, [amount, note, date, 1, incomeSourcesId, accountId]);
                yield db_pool_1.default.query("COMMIT;");
                rowsData = rows;
            }
            else {
                yield db_pool_1.default.query("BEGIN;");
                yield db_pool_1.default.query(`UPDATE accounts SET balance = balance + $1 WHERE id = $2`, [amount, accountId || 1]);
                const { rows } = yield db_pool_1.default.query(`INSERT INTO incomes (amount,note,user_id,income_sources_id,account_id) 
         VALUES 
         ($1,$2,$3,$4,$5)
         RETURNING *;
        `, [amount, note, 1, incomeSourcesId, accountId || 1]);
                yield db_pool_1.default.query("COMMIT;");
                rowsData = rows;
            }
            return (0, to_camel_case_1.default)(rowsData)[0];
        });
    }
    static updateIncome(id, reqBody) {
        return __awaiter(this, void 0, void 0, function* () {
            const { amount, note, date, incomeSourcesId, accountId } = reqBody;
            yield db_pool_1.default.query("BEGIN;");
            yield db_pool_1.default.query(`UPDATE accounts SET balance = balance + ($2 - (SELECT amount FROM incomes WHERE id = $1)) WHERE id = (SELECT account_id FROM incomes WHERE id = $1);`, [id, amount]);
            const { rows } = yield db_pool_1.default.query(`UPDATE incomes SET amount = $1 , note = $2 , date = $3 ,income_sources_id = $4, account_id = $5 WHERE id = $6 RETURNING *;`, [amount, note, date, incomeSourcesId, accountId, id]);
            yield db_pool_1.default.query(`COMMIT;`);
            return (0, to_camel_case_1.default)(rows)[0];
        });
    }
    static deleteIncome(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield db_pool_1.default.query("BEGIN;");
            yield db_pool_1.default.query(`UPDATE accounts SET balance = balance - (SELECT amount FROM incomes WHERE id = $1) WHERE id = (SELECT account_id FROM incomes WHERE id = $1);`, [id]);
            const { rows } = yield db_pool_1.default.query("DELETE FROM  incomes WHERE id = $1 RETURNING *", [id]);
            yield db_pool_1.default.query("COMMIT;");
            return (0, to_camel_case_1.default)(rows)[0];
        });
    }
}
exports.default = IncomesRepo;

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
class AccountsRepo {
    static getAllAccounts() {
        return __awaiter(this, void 0, void 0, function* () {
            const { rows } = yield db_pool_1.default.query(`SELECT id,account_name,balance,account_icon FROM accounts;`);
            return (0, to_camel_case_1.default)(rows);
        });
    }
    static getAllAccountList() {
        return __awaiter(this, void 0, void 0, function* () {
            const { rows } = yield db_pool_1.default.query("SELECT id,account_name FROM accounts;");
            return (0, to_camel_case_1.default)(rows);
        });
    }
    static createAccount(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            // for now no account icon
            const { accountName, balance, note, accountType } = payload;
            const { rows } = yield db_pool_1.default.query(`INSERT INTO accounts (account_name,balance,note,user_id,account_type)
      VALUES($1,$2,$3,$4,$5) RETURNING *;
      `, [accountName, balance, note, 1, accountType]);
            return (0, to_camel_case_1.default)(rows)[0];
        });
    }
    static updateAccount(id, payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const { accountName, balance, note, accountType } = payload;
            const { rows } = yield db_pool_1.default.query(`UPDATE accounts SET account_name = $1,balance = $2,note = $3, account_type = $4 WHERE id = $5 RETURNING*;`, [accountName, balance, note, accountType, id]);
            return (0, to_camel_case_1.default)(rows)[0];
        });
    }
    static deleteAccount(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const { rows } = yield db_pool_1.default.query(`DELETE FROM accounts WHERE id = $1 RETURNING*;`, [id]);
            return (0, to_camel_case_1.default)(rows)[0];
        });
    }
}
exports.default = AccountsRepo;

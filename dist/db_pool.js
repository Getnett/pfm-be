"use strict";
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _DbPool__pool;
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = __importDefault(require("pg"));
class DbPool {
    constructor() {
        _DbPool__pool.set(this, null);
    }
    connect(connectionString) {
        __classPrivateFieldSet(this, _DbPool__pool, new pg_1.default.Pool({ connectionString: connectionString }), "f");
        return __classPrivateFieldGet(this, _DbPool__pool, "f").query(`SELECT 1 + 1;`);
    }
    close() {
        if (__classPrivateFieldGet(this, _DbPool__pool, "f")) {
            return __classPrivateFieldGet(this, _DbPool__pool, "f").end();
        }
    }
    query(queryString, params) {
        return __classPrivateFieldGet(this, _DbPool__pool, "f").query(queryString, params);
    }
}
_DbPool__pool = new WeakMap();
exports.default = new DbPool();

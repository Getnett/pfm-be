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
const express_1 = __importDefault(require("express"));
const accounts_1 = __importDefault(require("../repos/accounts"));
const async_error_handler_1 = __importDefault(require("../middleware/async-error-handler"));
const router = express_1.default.Router();
router.get("/api/accounts", (0, async_error_handler_1.default)((_req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
    const resData = yield accounts_1.default.getAllAccounts();
    res.status(200).send(resData);
})));
router.get("/api/account-list", (0, async_error_handler_1.default)((_req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
    const resData = yield accounts_1.default.getAllAccountList();
    res.status(200).send(resData);
})));
router.post("/api/accounts", (0, async_error_handler_1.default)((req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
    const payload = req.body;
    const resData = yield accounts_1.default.createAccount(payload);
    res.status(201).send(resData);
})));
router.put("/api/accounts/:accountId", (0, async_error_handler_1.default)((req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
    const { accountId } = req.params;
    const payload = req.body;
    const resData = yield accounts_1.default.updateAccount(accountId, payload);
    res.status(200).send(resData);
})));
router.delete("/api/accounts/:accountId", (0, async_error_handler_1.default)((req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
    const { accountId } = req.params;
    yield accounts_1.default.deleteAccount(accountId);
    res.status(200).send("Deleted successfully!");
})));
exports.default = router;

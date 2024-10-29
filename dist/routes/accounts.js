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
const router = express_1.default.Router();
router.get("/api/accounts", (_req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const resData = yield accounts_1.default.getAllAccounts();
        res.status(200).send(resData);
    }
    catch (error) {
        next(error);
    }
}));
router.post("/api/accounts", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const payload = req.body;
    try {
        const resData = yield accounts_1.default.createAccount(payload);
        res.status(201).send(resData);
    }
    catch (error) {
        next(error);
    }
}));
router.put("/api/accounts/:accountId", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { accountId } = req.params;
    const payload = req.body;
    try {
        const resData = yield accounts_1.default.updateAccount(accountId, payload);
        res.status(200).send(resData);
    }
    catch (error) {
        next(error);
    }
}));
router.delete("/api/accounts/:accountId", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { accountId } = req.params;
    try {
        yield accounts_1.default.deleteAccount(accountId);
        res.status(200).send("Deleted successfully!");
    }
    catch (error) {
        next(error);
    }
}));
exports.default = router;

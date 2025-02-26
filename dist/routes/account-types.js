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
const async_error_handler_1 = __importDefault(require("../middleware/async-error-handler"));
const account_types_1 = __importDefault(require("../repos/account-types"));
const router = express_1.default.Router();
router.get("/api/account-type", (0, async_error_handler_1.default)((_req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
    const resData = yield account_types_1.default.getAllAccountTypes();
    res.status(200).send(resData);
})));
router.post("/api/account-type", (0, async_error_handler_1.default)((req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
    const { accountType } = req.body;
    const resData = yield account_types_1.default.createAccountType(accountType);
    res.status(200).send(resData);
})));
exports.default = router;

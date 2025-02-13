"use strict";
/**
 *  This AI integeration is based on the built in assistant API.
 *
 *
 * The need for an AI here is eventually to make the bot aware of the information in the database somehow and to respond needed information to user requests
 * based on the dataset it knows.
 *
 *
 *
 */
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
const openai_1 = __importDefault(require("openai"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_pool_1 = __importDefault(require("../../db_pool"));
const to_camel_case_1 = __importDefault(require("../../utils/to-camel-case"));
const openai = new openai_1.default();
dotenv_1.default.config();
class AssistantBot {
    static getExpenseCategoryTable() {
        return __awaiter(this, void 0, void 0, function* () {
            const { rows } = yield db_pool_1.default.query(`
      SELECT *
      FROM expenses 
      JOIN categories ON expenses.category_id = categories.id;
     `, []);
            return (0, to_camel_case_1.default)(rows);
        });
    }
    static getIncomeAndIncomeSourceTable() {
        return __awaiter(this, void 0, void 0, function* () {
            const { rows } = yield db_pool_1.default.query(`
      SELECT *
      FROM incomes 
      JOIN income_sources ON incomes.income_sources_id = income_sources.id;
     `, []);
            return (0, to_camel_case_1.default)(rows);
        });
    }
    static runAssistantBot(userMessage) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            // Step 1: Create a new thread
            const thread = yield openai.beta.threads.create();
            // Step 2: Add a message to the thread
            yield openai.beta.threads.messages.create(thread.id, {
                role: "user",
                content: userMessage,
            });
            // Step 3: Start a run with function calling enabled
            let run = yield openai.beta.threads.runs.createAndPoll(thread.id, {
                assistant_id: process.env.ASSISTANT_ID || "",
            });
            // Step 4: Check if Assistant requires an action to perform
            if (run.status === "completed") {
                return "I don't have this information!";
            }
            if (run.status === "requires_action") {
                console.log("after-1");
                if (run.required_action &&
                    run.required_action.submit_tool_outputs &&
                    run.required_action.submit_tool_outputs.tool_calls) {
                    console.log("after-2");
                    const toolsOuputs = [];
                    for (const toolCall of run.required_action.submit_tool_outputs
                        .tool_calls) {
                        const funcName = toolCall.function.name;
                        let outPut;
                        switch (funcName) {
                            case "get_all_expenses":
                                {
                                    outPut = yield AssistantBot.getExpenseCategoryTable();
                                    console.log({ outPut });
                                }
                                break;
                            case "get_all_incomes": {
                                outPut = yield AssistantBot.getIncomeAndIncomeSourceTable();
                                console.log({ outPut });
                            }
                            default:
                                break;
                        }
                        toolsOuputs.push({
                            tool_call_id: toolCall.id,
                            output: JSON.stringify(outPut),
                        });
                    }
                    if (toolsOuputs.length > 0) {
                        console.log(toolsOuputs);
                        run = yield openai.beta.threads.runs.submitToolOutputsAndPoll(thread.id, run.id, { tool_outputs: toolsOuputs });
                        console.log("Tool outputs submitted successfully.");
                    }
                }
                else {
                    console.log("No function call detected.");
                }
                // Step 5: Fetch the final assistant response
                const finalMessages = yield openai.beta.threads.messages.list(thread.id);
                const finalResponse = finalMessages.data.find((msg) => msg.role === "assistant");
                ///@ts-ignore
                return (_b = (_a = finalResponse === null || finalResponse === void 0 ? void 0 : finalResponse.content[0]) === null || _a === void 0 ? void 0 : _a.text) === null || _b === void 0 ? void 0 : _b.value;
            }
        });
    }
}
exports.default = AssistantBot;

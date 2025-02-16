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

import OpenAI from "openai";
import dotenv from "dotenv";
import dbPool from "../../db_pool";
import toCamelCase from "../../utils/to-camel-case";
const openai = new OpenAI();

dotenv.config();

export default class AssistantBot {
  static async getExpenseCategoryTable() {
    const { rows } = await dbPool.query(
      `
      SELECT *
      FROM expenses 
      JOIN categories ON expenses.category_id = categories.id;
     `,
      []
    );
    return toCamelCase(rows);
  }

  static async getIncomeAndIncomeSourceTable() {
    const { rows } = await dbPool.query(
      `
      SELECT *
      FROM incomes 
      JOIN income_sources ON incomes.income_sources_id = income_sources.id;
     `,
      []
    );
    return toCamelCase(rows);
  }

  static async runAssistantBot(userMessage: string) {
    // Step 1: Create a new thread
    const thread = await openai.beta.threads.create();

    // Step 2: Add a message to the thread
    await openai.beta.threads.messages.create(thread.id, {
      role: "user",
      content: userMessage,
    });

    // Step 3: Start a run with function calling enabled
    let run = await openai.beta.threads.runs.createAndPoll(thread.id, {
      assistant_id: process.env.ASSISTANT_ID || "",
    });

    // Step 4: Check if Assistant requires an action to perform

    if (run.status === "completed") {
      return "I don't have this information!";
    }
    if (run.status === "requires_action") {
      if (
        run.required_action &&
        run.required_action.submit_tool_outputs &&
        run.required_action.submit_tool_outputs.tool_calls
      ) {
        const toolsOuputs = [];
        for (const toolCall of run.required_action.submit_tool_outputs
          .tool_calls) {
          const funcName = toolCall.function.name;

          let outPut;
          switch (funcName) {
            case "get_all_expenses":
              {
                outPut = await AssistantBot.getExpenseCategoryTable();
                console.log({ outPut });
              }
              break;
            case "get_all_incomes": {
              outPut = await AssistantBot.getIncomeAndIncomeSourceTable();
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
          run = await openai.beta.threads.runs.submitToolOutputsAndPoll(
            thread.id,
            run.id,
            { tool_outputs: toolsOuputs }
          );
          console.log("Tool outputs submitted successfully.");
        }
      } else {
        console.log("No function call detected.");
      }
      // Step 5: Fetch the final assistant response
      const finalMessages = await openai.beta.threads.messages.list(thread.id);
      const finalResponse = finalMessages.data.find(
        (msg) => msg.role === "assistant"
      );

      ///@ts-ignore
      return finalResponse?.content[0]?.text?.value;
    }
  }
}

import dbPool from "../db_pool";
import { IncomePayload } from "../types/types";
import toCamelCase from "../utils/to-camel-case";

export default class IncomesRepo {
  static async getAllIncomes() {
    const { rows } = await dbPool.query("SELECT * FROM incomes;");
    return toCamelCase(rows);
  }

  static async getIncome(id: string) {
    const { rows } = await dbPool.query(
      "SELECT * FROM expenses WHERE id = $1",
      [id]
    );
    return toCamelCase(rows)[0];
  }

  static async createIncome(reqBody: IncomePayload) {
    const { amount, note, date, incomeSourcesId, accountId } = reqBody;

    const { rows } = await dbPool.query(
      `INSERT INTO incomes (amount,note,date,user_id,income_sources_id,account_id) 
       VALUES 
       ($1,$2,$3,$4,$5,$6)
       RETURNING *;
      `,
      [amount, note, date, 1, incomeSourcesId, accountId]
    );

    return toCamelCase(rows)[0];
  }
}

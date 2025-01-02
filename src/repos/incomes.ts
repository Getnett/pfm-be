import dbPool from "../db_pool";
import { IncomePayload } from "../types/types";
import toCamelCase from "../utils/to-camel-case";

export default class IncomesRepo {
  static async getAllIncomes() {
    const { rows } = await dbPool.query("SELECT * FROM incomes;");
    return toCamelCase(rows);
  }

  static async getIncome(id: string) {
    let incomeData = null;
    const { rows } = await dbPool.query(
      "SELECT * FROM incomes WHERE id = $1;",
      [id]
    );
    if (rows[0]?.income_sources_id) {
      const incomeSourceData = await dbPool.query(
        "SELECT income_source FROM income_sources WHERE id = $1;",
        [rows[0].income_sources_id]
      );

      incomeData = [{ ...rows[0], ...incomeSourceData.rows[0] }];
    }

    return toCamelCase(incomeData || rows)[0];
  }

  static async createIncome(reqBody: IncomePayload) {
    const { amount, note, date, incomeSourcesId, accountId } = reqBody;

    let rowsData = [];
    // check if there is a better way
    if (date) {
      await dbPool.query("BEGIN;");
      await dbPool.query(
        `UPDATE accounts SET balance = balance + $1 WHERE id = $2`,
        [amount, accountId || 1]
      );
      const { rows } = await dbPool.query(
        `INSERT INTO incomes (amount,note,date,user_id,income_sources_id,account_id) 
         VALUES 
         ($1,$2,$3,$4,$5,$6)
         RETURNING *;
        `,
        [amount, note, date, 1, incomeSourcesId, accountId]
      );
      await dbPool.query("COMMIT;");

      rowsData = rows;
    } else {
      await dbPool.query("BEGIN;");
      await dbPool.query(
        `UPDATE accounts SET balance = balance + $1 WHERE id = $2`,
        [amount, accountId || 1]
      );
      const { rows } = await dbPool.query(
        `INSERT INTO incomes (amount,note,user_id,income_sources_id,account_id) 
         VALUES 
         ($1,$2,$3,$4,$5)
         RETURNING *;
        `,
        [amount, note, 1, incomeSourcesId, accountId || 1]
      );
      await dbPool.query("COMMIT;");
      rowsData = rows;
    }

    return toCamelCase(rowsData)[0];
  }

  static async updateIncome(id: string, reqBody: any) {
    const { amount, note, date, incomeSourcesId, accountId } = reqBody;
    await dbPool.query("BEGIN;");
    await dbPool.query(
      `UPDATE accounts SET balance = balance + ($2 - (SELECT amount FROM incomes WHERE id = $1)) WHERE id = (SELECT account_id FROM incomes WHERE id = $1);`,
      [id, amount]
    );
    const { rows } = await dbPool.query(
      `UPDATE incomes SET amount = $1 , note = $2 , date = $3 ,income_sources_id = $4, account_id = $5 WHERE id = $6 RETURNING *;`,
      [amount, note, date, incomeSourcesId, accountId, id]
    );

    await dbPool.query(`COMMIT;`);

    return toCamelCase(rows)[0];
  }

  static async deleteIncome(id: string) {
    await dbPool.query("BEGIN;");

    await dbPool.query(
      `UPDATE accounts SET balance = balance - (SELECT amount FROM incomes WHERE id = $1) WHERE id = (SELECT account_id FROM incomes WHERE id = $1);`,
      [id]
    );
    const { rows } = await dbPool.query(
      "DELETE FROM  incomes WHERE id = $1 RETURNING *",
      [id]
    );
    await dbPool.query("COMMIT;");
    return toCamelCase(rows)[0];
  }
}

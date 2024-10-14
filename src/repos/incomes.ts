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

    let rowsData = [];
    // check if there is a better way
    if (date) {
      const { rows } = await dbPool.query(
        `INSERT INTO incomes (amount,note,date,user_id,income_sources_id,account_id) 
         VALUES 
         ($1,$2,$3,$4,$5,$6)
         RETURNING *;
        `,
        [amount, note, date, 1, incomeSourcesId, accountId]
      );
      rowsData = rows;
    } else {
      const { rows } = await dbPool.query(
        `INSERT INTO incomes (amount,note,user_id,income_sources_id,account_id) 
         VALUES 
         ($1,$2,$3,$4,$5)
         RETURNING *;
        `,
        [amount, note, 1, incomeSourcesId, accountId]
      );
      rowsData = rows;
    }

    return toCamelCase(rowsData)[0];
  }

  static async updateIncome(id: string, reqBody: any) {
    let query = "UPDATE incomes SET";
    const fieldsToUpdate: string[] = [];
    const values: any[] = [];

    Object.keys(reqBody).forEach((key, index) => {
      const snakeCasedField = key.replace(/[A-Z]/g, ($1) =>
        $1.toLowerCase().replace("", "_")
      );

      fieldsToUpdate.push(`${snakeCasedField} = $${index + 1}`);
      values.push(reqBody[key]);
    });

    values.push(id);

    query =
      query +
      " " +
      fieldsToUpdate.join(", ") +
      ` WHERE id = $${fieldsToUpdate.length + 1} RETURNING *;`;

    const { rows } = await dbPool.query(query, values);
    return toCamelCase(rows)[0];
  }
  static async deleteIncome(id: string) {
    const { rows } = await dbPool.query(
      "DELETE FROM  incomes WHERE id = $1 RETURNING *",
      [id]
    );
    return toCamelCase(rows)[0];
  }
}

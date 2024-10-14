import dbpool from "../db_pool";
import { ExpensePayload } from "../types/types";
import toCamelCase from "../utils/to-camel-case";

export default class ExpensesRepo {
  static async getAllExpenses() {
    const { rows } = await dbpool.query("SELECT * FROM expenses;");
    return toCamelCase(rows);
  }

  static async getExpense(id: string) {
    const { rows } = await dbpool.query(
      "SELECT * FROM expenses WHERE id = $1;",
      [id]
    );
    return toCamelCase(rows)[0];
  }

  static async createExpense(reqBody: ExpensePayload) {
    const { amount, date, note, categoryId, accountId } = reqBody;
    const { rows } = await dbpool.query(
      `
    INSERT INTO expenses  (amount,date,note,user_id,category_id,account_id)  VALUES ($1,$2,$3,$4,$5,$6) RETURNING *;
    `,
      [amount, date, note, 1, categoryId, accountId]
    );

    return toCamelCase(rows)[0];
  }
  // reqBody change type
  static async updateExpense(id: string, reqBody: any) {
    let query = "UPDATE expenses SET";

    const fieldsToUpdate: string[] = [];
    const values = [];

    Object.keys(reqBody).forEach((key, index) => {
      const snakeCase = key.replace(/[A-Z]/g, ($1) =>
        $1.toLowerCase().replace("", "_")
      );
      fieldsToUpdate.push(`${snakeCase} = $${index + 1}`);
      values.push(reqBody[key]);
    });

    query =
      query +
      " " +
      fieldsToUpdate.join(", ") +
      ` WHERE id = $${fieldsToUpdate.length + 1} RETURNING *;`;

    values.push(id);
    const { rows } = await dbpool.query(query.toString(), values);
    return toCamelCase(rows)[0];
  }

  static async deleteExpense(id: string) {
    const { rows } = await dbpool.query(
      "DELETE FROM expenses WHERE id = $1 RETURNING *;",
      [id]
    );
    return toCamelCase(rows)[0];
  }
}

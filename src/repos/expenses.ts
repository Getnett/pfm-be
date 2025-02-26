import dbpool from "../db_pool";
import { ExpensePayload } from "../types/types";
import toCamelCase from "../utils/to-camel-case";

export default class ExpensesRepo {
  static async getAllExpenses() {
    const { rows } = await dbpool.query("SELECT * FROM expenses;");
    return toCamelCase(rows);
  }

  static async getExpense(id: string) {
    let expenseData = null;
    const { rows } = await dbpool.query(
      "SELECT * FROM expenses WHERE id = $1;",
      [id]
    );

    if (rows[0]?.category_id) {
      const categoryData = await dbpool.query(
        "SELECT category_name FROM categories WHERE id = $1",
        [rows[0].category_id]
      );
      expenseData = [{ ...rows[0], ...categoryData.rows[0] }];
    }

    return toCamelCase(expenseData || rows)[0];
  }

  static async createExpense(reqBody: ExpensePayload) {
    const { amount, date, note, categoryId, accountId } = reqBody;
    let rowsData = [];

    if (date) {
      await dbpool.query("BEGIN;");
      await dbpool.query(
        ` UPDATE accounts SET balance = balance - $1 WHERE id = $2;`,
        [amount, accountId || 1]
      );
      const { rows } = await dbpool.query(
        `INSERT INTO expenses  (amount,date,note,user_id,category_id,account_id)  VALUES ($1,$2,$3,$4,$5,$6) RETURNING *;`,
        [amount, date, note, 1, categoryId, accountId || 1]
      );
      await dbpool.query("COMMIT;");
      rowsData = rows;
    } else {
      await dbpool.query("BEGIN;");
      await dbpool.query(
        ` UPDATE accounts SET balance = balance - $1 WHERE id = $2;`,
        [amount, accountId || 1]
      );
      const { rows } = await dbpool.query(
        ` INSERT INTO expenses  (amount,note,user_id,category_id,account_id)  VALUES ($1,$2,$3,$4,$5) RETURNING *;`,
        [amount, note, 1, categoryId, accountId || 1]
      );
      await dbpool.query("COMMIT;");
      rowsData = rows;
    }

    return toCamelCase(rowsData)[0];
  }
  // reqBody change type
  static async updateExpense(id: string, reqBody: any) {
    const { amount, date, note, categoryId, accountId } = reqBody;

    await dbpool.query("BEGIN;");

    await dbpool.query(
      `UPDATE accounts SET balance = balance - ($2 - (SELECT amount FROM expenses WHERE id = $1)) WHERE id = (SELECT account_id FROM expenses WHERE id = $1)`,
      [id, amount]
    );

    const { rows } = await dbpool.query(
      `
       UPDATE expenses SET  amount = $1 , date = $2 , note = $3 , category_id = $4 , account_id = $5   WHERE  id = $6 RETURNING *;
     `,
      [amount, date, note, categoryId, accountId, id]
    );

    await dbpool.query(`COMMIT;`);

    return toCamelCase(rows)[0];

    // let query = "UPDATE expenses SET";
    // const fieldsToUpdate: string[] = [];
    // const values: any[] = [];
    // Object.keys(reqBody).forEach((key, index) => {
    //   const snakeCase = key.replace(/[A-Z]/g, ($1) =>
    //     $1.toLowerCase().replace("", "_")
    //   );
    //   fieldsToUpdate.push(`${snakeCase} = $${index + 1}`);
    //   values.push(reqBody[key]);
    // });
    // query =
    //   query +
    //   " " +
    //   fieldsToUpdate.join(", ") +
    //   ` WHERE id = $${fieldsToUpdate.length + 1} RETURNING *;`;
    // values.push(id);
    // const { rows } = await dbpool.query(query.toString(), values);
    // return toCamelCase(rows)[0];
  }

  static async deleteExpense(id: string) {
    await dbpool.query("BEGIN;");
    await dbpool.query(
      `UPDATE accounts SET balance = balance + ( SELECT amount FROM expenses WHERE id = $1 ) WHERE id = (SELECT account_id FROM expenses WHERE id = $1); `,
      [id]
    );
    const { rows } = await dbpool.query(
      "DELETE FROM expenses WHERE id = $1 RETURNING *;",
      [id]
    );
    await dbpool.query("COMMIT;");
    return toCamelCase(rows)[0];
  }
}

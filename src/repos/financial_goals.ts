import dbPool from "../db_pool";
import toCamelCase from "../utils/to-camel-case";

export default class FinancialGoalRepo {
  static async createFinancialGoal(payload: any) {
    const { goalName, targetAmount, deadline } = payload;
    const { rows } = await dbPool.query(
      `INSERT INTO financial_goals (goal_name,target_amount,deadline,user_id) VALUES ($1,$2,$3,$4) RETURNING *;`,
      [goalName, targetAmount, deadline, 1]
    );
    return toCamelCase(rows)[0];
  }

  static async getAllFinancialGoals(year: number) {
    const { rows } = await dbPool.query(
      `SELECT * FROM financial_goals WHERE EXTRACT(YEAR FROM deadline) = $1; `,
      [year]
    );
    return toCamelCase(rows);
  }

  static async updateFinancialGoal(id: string, payload: any) {
    let query = "UPDATE financial_goals SET";
    let fieldsToUpdate: string[] = [];
    let values: any[] = [];

    Object.keys(payload).forEach((field, index) => {
      const snakeCase = field.replace(/[A-Z]/g, ($1) =>
        $1.toLowerCase().replace("", "_")
      );
      fieldsToUpdate.push(`${snakeCase} = $${index + 1}`);
      values.push(payload[field]);
    });

    query =
      query +
      " " +
      fieldsToUpdate +
      " " +
      `WHERE id = $${fieldsToUpdate.length + 1} RETURNING *;`;
    values.push(id);

    const { rows } = await dbPool.query(query, values);
    return toCamelCase(rows)[0];
  }

  static async deleteFinancialGoal(id: string) {
    const { rows } = await dbPool.query(
      ` DELETE FROM financial_goals WHERE id = $1 RETURNING *;
     `,
      [id]
    );
    return toCamelCase(rows)[0];
  }
}

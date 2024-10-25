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

  // create goal_contributions
  static async createFinancialGoalContrubutions(payload: any) {
    const { amount, financialGoalId } = payload;
    const { rows } = await dbPool.query(
      ` INSERT INTO  goal_contributions (amount,goal_id,user_id)
        VALUES ($1,$2,$3) RETURNING *;
      `,
      [amount, financialGoalId, 1]
    );
    return toCamelCase(rows)[0];
  }

  static async getAllContributionsForFinancialGoalContribution(
    financialGoalId: number
  ) {
    const { rows } = await dbPool.query(
      ` SELECT * FROM goal_contributions WHERE goal_id = $1;`,
      [financialGoalId]
    );
    return toCamelCase(rows);
  }

  static async updateFinancialGoalContribution(
    contributionGoalId: string,
    payload: any
  ) {
    const { amount } = payload;
    const { rows } = await dbPool.query(
      `UPDATE goal_contributions SET amount = $1 WHERE id = $2 RETURNING *; `,
      [amount, contributionGoalId]
    );
    return toCamelCase(rows)[0];
  }

  static async deleteFinancialGoalContribution(contributionGoalId: string) {
    const { rows } = await dbPool.query(
      `DELETE FROM goal_contributions WHERE id = $1 RETURNING *; `,
      [contributionGoalId]
    );

    return toCamelCase(rows)[0];
  }
}

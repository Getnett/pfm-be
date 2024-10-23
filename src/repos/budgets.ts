import dbPool from "../db_pool";
import toCamelCase from "../utils/to-camel-case";

export default class BudgetRepo {
  static async createMonthlyBudget(payload: any) {
    const { amount, period, startDate, endDate, categoryId } = payload;
    const { rows } = await dbPool.query(
      `
       INSERT INTO budgets (amount,period,start_date,end_date,user_id,category_id) 
       VALUES ($1,$2,$3,$4,$5,$6) RETURNING *;
     `,
      [amount, period, startDate, endDate, 1, categoryId]
    );
    return toCamelCase(rows)[0];
  }

  static async getAllMonthlyBudgets(month: number, year: number) {
    const { rows } = await dbPool.query(
      `
      SELECT category_name,SUM(budgets.amount)AS limit,SUM(expenses.amount) AS total_spent FROM budgets
      JOIN categories ON budgets.category_id = categories.id
      LEFT JOIN expenses ON expenses.category_id = budgets.category_id
      WHERE  period = 'month' AND  EXTRACT(MONTH FROM budgets.start_date) = $1 AND EXTRACT(YEAR FROM start_date) = $2
      GROUP BY categories.category_name
     `,
      [month, year]
    );

    return toCamelCase(rows);
  }

  static async getAllYearlyBudgets(year: number) {
    const { rows } = await dbPool.query(
      `
      SELECT category_name,SUM(budgets.amount)AS limit,SUM(expenses.amount) AS total_spent FROM budgets
      JOIN categories ON budgets.category_id = categories.id
      LEFT JOIN expenses ON expenses.category_id = budgets.category_id
      WHERE  period = 'year'AND EXTRACT(YEAR FROM start_date) = $1
      GROUP BY categories.category_name
     `,
      [year]
    );

    return toCamelCase(rows);
  }

  static async updateBudget(id: string, payload: any) {
    const { amount } = payload;
    const { rows } = await dbPool.query(
      "UPDATE budgets SET amount = $1 WHERE id = $2 RETURNING *;",
      [amount, id]
    );
    return toCamelCase(rows)[0];
  }

  static async deleteBudget(id: string) {
    const { rows } = await dbPool.query("DELETE FROM budgets WHERE  id = $1", [
      id,
    ]);
    return toCamelCase(rows)[0];
  }
}

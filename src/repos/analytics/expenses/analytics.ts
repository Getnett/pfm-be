import dbPool from "../../../db_pool";
import toCamelCase from "../../../utils/to-camel-case";

export default class ExpenseAnalytics {
  static async getMonthlyAnalytics(month: number, year: number) {
    const { rows } = await dbPool.query(
      `
      WITH expense_transaction  AS (SELECT 
        DATE(date) AS transaction_date,
        SUM(amount) AS total
        FROM expenses 
        WHERE EXTRACT(YEAR FROM date) = 2024 AND EXTRACT(MONTH FROM date) = 12
        GROUP BY DATE(date)
        ),
         income_transaction  AS (
        SELECT 
        DATE(date) AS transaction_date,
        SUM(amount) AS total
        FROM incomes
        WHERE EXTRACT(YEAR FROM date) = 2024 AND EXTRACT(MONTH FROM date) = 12
        GROUP BY DATE(date)
        ),
        exp_trans AS (
        SELECT * FROM expenses
        JOIN categories ON categories.id = expenses.category_id
        JOIN expense_transaction ON  DATE(expenses.date) = expense_transaction.transaction_date
        ),
        income_trans AS (
        SELECT * FROM incomes
        JOIN income_sources ON income_sources.id = incomes.income_sources_id
        JOIN income_transaction ON DATE(incomes.date) = income_transaction.transaction_date
        ) 
        
        
        SELECT distinct *   FROM exp_trans
        JOIN income_trans ON income_trans.transaction_date = exp_trans.transaction_date;
        
    `,
      [month, year]
    );

    return toCamelCase(rows);
  }

  static async getMonthlyDailySpend(month: number, year: number) {
    const { rows } = await dbPool.query(
      `
      SELECT amount,TO_CHAR(date,'DD mon') AS date FROM expenses WHERE EXTRACT(MONTH FROM date) = $1 AND EXTRACT(YEAR FROM date) = $2
    `,
      [month, year]
    );

    return toCamelCase(rows);
  }

  static async getYearlyAnalytics(year: number) {
    const { rows } = await dbPool.query(
      `
    SELECT SUM(amount) AS total,category_name,ROUND(SUM(amount)::numeric/(SELECT SUM(amount) FROM expenses) * 100,2) AS percentage
    FROM expenses 
    JOIN  categories ON  expenses.category_id = categories.id 
    WHERE EXTRACT(YEAR FROM date) = $1
    GROUP BY category_name;
    `,
      [year]
    );

    return toCamelCase(rows);
  }

  static async getYearlyMonthlySpend(year: number) {
    const { rows } = await dbPool.query(
      `SELECT SUM(amount) AS total,TO_CHAR(date,'DD mon') AS month FROM expenses GROUP BY month`
    );
    return toCamelCase(rows);
  }
}

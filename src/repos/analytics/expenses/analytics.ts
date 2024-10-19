import dbPool from "../../../db_pool";
import toCamelCase from "../../../utils/to-camel-case";

export default class ExpenseAnalytics {
  static async getMontlyAnalytics(month: number, year: number) {
    const { rows } = await dbPool.query(
      `
    SELECT SUM(amount) AS total,category_name,ROUND(SUM(amount)::numeric/(SELECT SUM(amount) FROM expenses) * 100,2) AS percentage
    FROM expenses 
    JOIN  categories ON  expenses.category_id = categories.id 
    WHERE EXTRACT(MONTH FROM date) = $1 AND EXTRACT(YEAR FROM date) = $2
    GROUP BY category_name;
    
    `,
      [month, year]
    );

    return toCamelCase(rows);
  }

  static async getMontlyDailySpend(month: number, year: number) {
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

  static async getYearlyMontlySpend(year: number) {
    const { rows } = await dbPool.query(
      `SELECT SUM(amount) AS total,TO_CHAR(date,'DD mon') AS month FROM expenses GROUP BY month`
    );
    return toCamelCase(rows);
  }
}

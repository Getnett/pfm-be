import dbPool from "../../../db_pool";
import toCamelCase from "../../../utils/to-camel-case";
export default class IncomeAnalytics {
  static async getMonthlyAnalytics(month: number, year: number) {
    const { rows } = await dbPool.query(
      `
    SELECT SUM(amount) AS total,income_source,ROUND(SUM(amount)::numeric/(SELECT SUM(amount) FROM incomes) * 100,2) AS percentage
    FROM incomes 
    JOIN  income_sources ON  incomes.income_sources_id = income_sources.id 
    WHERE EXTRACT(MONTH FROM date) = $1 AND EXTRACT(YEAR FROM date) = $2
    GROUP BY income_source;
    
    `,
      [month, year]
    );

    return toCamelCase(rows);
  }

  static async getMonthlyDailySourceIncomes(month: number, year: number) {
    const { rows } = await dbPool.query(
      `
      SELECT amount,TO_CHAR(date,'DD mon') AS date FROM incomes WHERE EXTRACT(MONTH FROM date) = $1 AND EXTRACT(YEAR FROM date) = $2
    `,
      [month, year]
    );

    return toCamelCase(rows);
  }

  static async getTotalMonthlyIncome(month: number, year: number) {
    const { rows } = await dbPool.query(
      "SELECT SUM(amount) AS total FROM incomes WHERE EXTRACT(MONTH FROM date) = $1 AND EXTRACT(YEAR FROM date) = $2",
      [month, year]
    );

    return toCamelCase(rows)[0];
  }

  static async getYearlyAnalytics(year: number) {
    const { rows } = await dbPool.query(
      `
    SELECT SUM(amount) AS total,income_source,ROUND(SUM(amount)::numeric/(SELECT SUM(amount) FROM incomes) * 100,2) AS percentage
    FROM incomes 
    JOIN  income_sources ON  incomes.income_sources_id = income_sources.id   
    WHERE EXTRACT(YEAR FROM date) = $1
    GROUP BY income_source;
    `,
      [year]
    );

    return toCamelCase(rows);
  }

  static async getYearlyMontlyIncomeSources(year: number) {
    const { rows } = await dbPool.query(
      `SELECT SUM(amount) AS total,TO_CHAR(date,'DD mon') AS month FROM incomes GROUP BY month`
    );
    return toCamelCase(rows);
  }
}

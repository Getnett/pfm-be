import dbPool from "../../../db_pool";
import toCamelCase from "../../../utils/to-camel-case";
export default class IncomeAnalytics {
  static async getMonthlyAnalytics(month: number, year: number) {
    const { rows } = await dbPool.query(
      `
    SELECT SUM(amount) AS total,income_source,income_sources.id AS ics_id,ROUND(SUM(amount)::numeric/(SELECT SUM(amount) FROM incomes) * 100,2) AS percentage
    FROM incomes 
    JOIN  income_sources ON  incomes.income_sources_id = income_sources.id 
    WHERE EXTRACT(MONTH FROM date) = $1 AND EXTRACT(YEAR FROM date) = $2
    GROUP BY income_source,income_sources.id;
    
    `,
      [month, year]
    );

    return toCamelCase(rows);
  }

  static async getMonthlyDailySourceIncomes(month: number, year: number) {
    const { rows } = await dbPool.query(
      `
      SELECT SUM(amount) AS amount,TO_CHAR(date,'DD mon') AS date FROM incomes 
      WHERE EXTRACT(MONTH FROM date) = $1 AND EXTRACT(YEAR FROM date) = $2
      GROUP BY TO_CHAR(date,'DD mon')
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

  // yearly info

  static async getYearlyIncomeAnalyticsByIncomeSource(
    icsId: number,
    year: number
  ) {
    const { rows } = await dbPool.query(
      `
        WITH  total_sum  AS (
        SELECT SUM(amount) FROM  incomes
        WHERE incomes.income_sources_id = $1 AND EXTRACT(YEAR FROM date) = $2
        )
        SELECT incomes.id as income_id, note,income_source,TO_CHAR(date,'DD mon') AS date,amount, ROUND(amount::numeric / (SELECT * FROM total_sum) * 100,2) AS percentage  
        FROM incomes 
        JOIN income_sources ON incomes.income_sources_id = income_sources.id
        WHERE incomes.income_sources_id = $1 AND EXTRACT(YEAR FROM date) = $2;
      
       
        `,
      [icsId, year]
    );

    return toCamelCase(rows);
  }

  static async getYearlyAnalytics(year: number) {
    const { rows } = await dbPool.query(
      `
    WITH  total_sum  AS (
    SELECT SUM(amount) FROM  incomes
    WHERE EXTRACT(YEAR FROM date) = $1
    )
    SELECT SUM(amount) AS total,income_source,income_sources.id AS ics_id,$1 AS year, ROUND(SUM(amount)::numeric/(SELECT * FROM total_sum) * 100,2) AS percentage
    FROM incomes 
    JOIN  income_sources ON  incomes.income_sources_id = income_sources.id   
    WHERE EXTRACT(YEAR FROM date) = $1
    GROUP BY income_source,income_sources.id;
    `,
      [year]
    );

    return toCamelCase(rows);
  }

  static async getYearlyMontlyIncomeSources(year: number) {
    const { rows } = await dbPool.query(
      `
      SELECT SUM(amount) AS total,TO_CHAR(date,'DD mon') AS month FROM incomes 
      WHERE EXTRACT(YEAR FROM date) = $1
      GROUP BY month `,
      [year]
    );
    return toCamelCase(rows);
  }
}

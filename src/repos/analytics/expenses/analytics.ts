import dbPool from "../../../db_pool";
import toCamelCase from "../../../utils/to-camel-case";

export default class ExpenseAnalytics {
  static async getMonthlyAnalytics(month: number, year: number) {
    const { rows } = await dbPool.query(
      `
        WITH  total_sum  AS (
        SELECT SUM(amount) FROM  expenses
        WHERE EXTRACT(MONTH FROM date) = $1
        )
        SELECT SUM(amount) AS total,category_name,categories.id  AS cat_id, ROUND(SUM(amount)::numeric/(SELECT * FROM total_sum) * 100,2) AS percentage
        FROM expenses 
        JOIN  categories ON  expenses.category_id = categories.id 
        WHERE  EXTRACT(MONTH FROM date) = $1 AND EXTRACT(YEAR FROM date) = $2
        GROUP BY category_name,categories.id;
        
    `,
      [month, year]
    );

    return toCamelCase(rows);
  }

  static async getMonthlyDailySpend(month: number, year: number) {
    const { rows } = await dbPool.query(
      `
      SELECT SUM(amount),TO_CHAR(date,'DD mon') AS date FROM expenses 
      WHERE EXTRACT(MONTH FROM date) = $1 AND EXTRACT(YEAR FROM date) = $2 
      GROUP BY TO_CHAR(date,'DD mon');
    `,
      [month, year]
    );

    return toCamelCase(rows);
  }

  static async getYearlyAnalytics(year: number) {
    const { rows } = await dbPool.query(
      `
    WITH  total_sum  AS (
    SELECT SUM(amount) FROM  expenses
    WHERE EXTRACT(YEAR FROM date) = $1
    )
    SELECT SUM(amount) AS total,category_name,categories.id AS cat_id,$1 AS year,ROUND(SUM(amount)::numeric/(SELECT * FROM total_sum) * 100,2) AS percentage
    FROM expenses 
    JOIN  categories ON  expenses.category_id = categories.id 
    WHERE EXTRACT(YEAR FROM date) = $1
    GROUP BY category_name,categories.id;
    `,
      [year]
    );

    return toCamelCase(rows);
  }

  static async getYearlyExpenseAnalyticsByCategory(
    catId: number,
    year: number
  ) {
    const { rows } = await dbPool.query(
      `
        WITH  total_sum  AS (
        SELECT SUM(amount) FROM  expenses
        WHERE expenses.category_id = $1 AND EXTRACT(YEAR FROM date) = $2
        )
        SELECT expenses.id as expense_id, note,category_name,TO_CHAR(date,'DD mon') AS date,amount, ROUND(amount::numeric / (SELECT * FROM total_sum) * 100,2) AS percentage  
        FROM expenses 
        JOIN categories ON expenses.category_id = categories.id
        WHERE expenses.category_id = $1 AND EXTRACT(YEAR FROM date) = $2;
      
       
        `,
      [catId, year]
    );

    return toCamelCase(rows);
  }

  // monthly

  static async getMonthlyExpenseAnalyticsByCategory(
    catId: number,
    month: number,
    year: number
  ) {
    const { rows } = await dbPool.query(
      `
        WITH  total_sum  AS (
        SELECT SUM(amount) FROM  expenses
        WHERE expenses.category_id = $1 AND EXTRACT(MONTH FROM date) = $2 AND EXTRACT(YEAR FROM date) = $3
        )
        SELECT expenses.id as expense_id, note,category_name,TO_CHAR(date,'DD mon') AS date,amount, ROUND(amount::numeric / (SELECT * FROM total_sum) * 100,2) AS percentage  
        FROM expenses 
        JOIN categories ON expenses.category_id = categories.id
        WHERE expenses.category_id = $1 AND EXTRACT(MONTH FROM date) = $2 AND EXTRACT(YEAR FROM date) = $3;
      `,
      [catId, month, year]
    );

    return toCamelCase(rows);
  }

  static async getYearlyMonthlySpend(year: number) {
    const { rows } = await dbPool.query(
      `
      SELECT SUM(amount) AS total,TO_CHAR(date,'DD mon') AS month FROM expenses
      WHERE EXTRACT(YEAR FROM date) = $1
      GROUP BY month`,
      [year]
    );
    return toCamelCase(rows);
  }

  static async getMonthlyTotalSpend(month: number, year: number) {
    const { rows } = await dbPool.query(
      "SELECT SUM(amount) AS total FROM expenses WHERE  EXTRACT(MONTH FROM date) = $1 AND EXTRACT(YEAR FROM date) = $2;",
      [month, year]
    );

    return toCamelCase(rows)[0];
  }
  // SELECT note,category_name,date,amount,ROUND(SUM(amount)::numeric/(SELECT * FROM total_sum) * 100,2) AS percentage
  // FROM expenses
  // JOIN categories ON expenses.category_id = categories.id
  // WHERE expenses.category_id = $1 AND EXTRACT(YEAR FROM date) = $2;
  // monthly
  // data categorized by category
  // total-amount,total-perc,categoryname -> goes detail

  // yearly

  // data categorized by category
  // total-amount,total-perc,categoryname -> goes detail

  // static async getYearlyAnalyticsByD(year: number) {
  //   const { rows } = await dbPool.query(
  //     `
  //   WITH  total_sum  AS (
  //   SELECT SUM(amount) FROM  expenses
  //   WHERE EXTRACT(YEAR FROM date) = $1
  //   )
  //   SELECT SUM(amount) AS total,category_name,ROUND(SUM(amount)::numeric/(SELECT * FROM total_sum) * 100,2) AS percentage
  //   FROM expenses
  //   JOIN  categories ON  expenses.category_id = categories.id
  //   WHERE EXTRACT(YEAR FROM date) = $1
  //   GROUP BY category_name,categories.category_id;

  //   `,
  //     [year]
  //   );

  //   return toCamelCase(rows);
  // }
}

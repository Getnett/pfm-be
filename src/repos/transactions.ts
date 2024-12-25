import dbPool from "../db_pool";
import toCamelCase from "../utils/to-camel-case";

export default class TransactionsRepo {
  static async getTransactions(month: number, year: number) {
    const { rows } = await dbPool.query(
      `WITH expense_transaction  AS (SELECT 
        TO_CHAR(expenses.date, 'Mon DD Day') AS transaction_date,
        SUM(amount) AS total,
        'expense' AS type
        FROM expenses 
        WHERE EXTRACT(YEAR FROM date) = $2 AND EXTRACT(MONTH FROM date) = $1
        GROUP BY TO_CHAR(expenses.date,'Mon DD Day')
        ),
         income_transaction  AS (
        SELECT 
        TO_CHAR(incomes.date, 'Mon DD Day')  AS transaction_date,
        SUM(amount) AS total,
        'income' AS type
        FROM incomes
        WHERE EXTRACT(YEAR FROM date) = $2 AND EXTRACT(MONTH FROM date) = $1
        GROUP BY TO_CHAR(incomes.date,'Mon DD Day')
        ),
        exp_trans AS (
        SELECT id,amount,note,date,transaction_date,total,type FROM expenses
        JOIN expense_transaction ON TO_CHAR(expenses.date, 'Mon DD Day')  = expense_transaction.transaction_date
        ),
        income_trans AS (
        SELECT id,amount,note,date,transaction_date,total,type FROM incomes
         JOIN income_transaction ON TO_CHAR(incomes.date, 'Mon DD Day')  = income_transaction.transaction_date
        ) 
        
        SELECT * FROM exp_trans
        UNION ALL 
        SELECT * FROM income_trans
        ORDER BY transaction_date DESC;
        `,
      [month, year]
    );

    return toCamelCase(rows);
  }
}

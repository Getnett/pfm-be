import dbPool from "../db_pool";
import toCamelCase from "../utils/to-camel-case";

export default class AccountsRepo {
  static async getAllAccounts() {
    const { rows } = await dbPool.query(`SELECT * FROM accounts;`);
    return toCamelCase(rows);
  }

  static async getAllAccountList() {
    const { rows } = await dbPool.query(
      "SELECT id,account_name FROM accounts;"
    );
    return toCamelCase(rows);
  }
  static async createAccount(payload: any) {
    // for now no account icon
    const { accountName, balance, note, accountType } = payload;
    const { rows } = await dbPool.query(
      `INSERT INTO accounts (account_name,balance,note,user_id,account_type)
      VALUES($1,$2,$3,$4,$5) RETURNING *;
      `,
      [accountName, balance, note, 1, accountType]
    );
    return toCamelCase(rows)[0];
  }
  static async updateAccount(id: string, payload: any) {
    const { accountName, balance, note, accountType } = payload;
    const { rows } = await dbPool.query(
      `UPDATE accounts SET account_name = $1,balance = $2,note = $3, account_type = $4 WHERE id = $5 RETURNING*;`,
      [accountName, balance, note, accountType, id]
    );
    return toCamelCase(rows)[0];
  }
  static async deleteAccount(id: string) {
    const { rows } = await dbPool.query(
      `DELETE FROM accounts WHERE id = $1 RETURNING*;`,
      [id]
    );
    return toCamelCase(rows)[0];
  }
}

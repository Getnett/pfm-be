import dbPool from "../db_pool";
import toCamelCase from "../utils/to-camel-case";

export default class AccountTypeRepo {
  static async getAllAccountTypes() {
    const { rows } = await dbPool.query("SELECT * FROM account_types;");
    return toCamelCase(rows);
  }
  static async createAccountType(accountType: string) {
    const { rows } = await dbPool.query(
      `
    INSERT INTO account_types (account_type)    
    VALUES ($1) RETURNING *;
    `,
      [accountType]
    );
    return toCamelCase(rows)[0];
  }
}

import dbPool from "../db_pool";
import toCamelCase from "../utils/to-camel-case";

export default class IncomeSourceRepo {
  static async getAllIncomeSources() {
    const { rows } = await dbPool.query("SELECT * FROM income_sources;");
    return toCamelCase(rows);
  }

  static async createIncomeSource(incomeSource: string) {
    const { rows } = await dbPool.query(
      `
       INSERT INTO income_sources (income_source)
       VALUES ($1) RETURNING *;
    `,
      [incomeSource]
    );

    return toCamelCase(rows)[0];
  }
}

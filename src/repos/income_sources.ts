import db_pool from "../db_pool";
import toCamelCase from "../utils/to-camel-case";

export default class IncomeSourceRepo {
  static async getAllIncomeSources() {
    const { rows } = await db_pool.query("SELECT * FROM income_sources;");
    return toCamelCase(rows);
  }
}

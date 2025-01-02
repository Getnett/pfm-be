import dbPool from "../db_pool";
import toCamelCase from "../utils/to-camel-case";

export default class CategoriesRepo {
  static async getAllCategories() {
    const { rows } = await dbPool.query("SELECT * FROM categories;");
    return toCamelCase(rows);
  }
}

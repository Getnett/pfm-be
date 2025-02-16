import dbPool from "../db_pool";
import toCamelCase from "../utils/to-camel-case";

export default class CategoriesRepo {
  static async getAllCategories() {
    const { rows } = await dbPool.query("SELECT * FROM categories;");
    return toCamelCase(rows);
  }

  static async addCategory(categoryName: string) {
    const { rows } = await dbPool.query(
      `
       INSERT INTO categories (category_name)
       VALUES ($1) RETURNING *;
    `,
      [categoryName]
    );

    return toCamelCase(rows)[0];
  }
}

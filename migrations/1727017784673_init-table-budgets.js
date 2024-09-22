/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
exports.shorthands = undefined;

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.up = (pgm) => {
  //  check ENUM like in postgres sql
  pgm.sql(`CREATE TABLE budgets(
            id SERIAL PRIMARY KEY,
            amount INTEGER NOT NULL,
            period VARCHAR(20),
            start_date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
            end_date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
            user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
            category_id INTEGER NOT NULL REFERENCES categories(id)
     );`);
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.down = (pgm) => {
  pgm.sql(`CREATE TABLE budgets;`);
};

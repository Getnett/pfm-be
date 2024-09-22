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
  pgm.sql(`
       CREATE TABLE financial_goals(
          id SERIAL PRIMARY KEY,
          goal_name VARCHAR(40) NOT NULL UNIQUE,
          target_amount INTEGER NOT NULL,
          current_amount  INTEGER ,
          deadline TIMESTAMP WITH TIME ZONE,
          user_id INTEGER REFERENCES users(id)

    );`);
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.down = (pgm) => {
  pgm.sql(`DROP TABLE financial_goals;`);
};

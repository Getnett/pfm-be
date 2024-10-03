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
    INSERT INTO income_sources (income_source)
    VALUES 
    ('salary'),
    ('investments'),
    ('part_time'),
    ('awards'),
    ('others')
    `);
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.down = (pgm) => {
  pgm.sql(`DELETE FROM income_sources 
         WHERE income_source IN 
         (
          'salary',
          'investments',
          'part_time',
          'awards',
          'others'
         )
      `);
};
